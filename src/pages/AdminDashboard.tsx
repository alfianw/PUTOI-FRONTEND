import { useEffect, useState } from "react";
import { useAuth } from "../utils/auth-context";
import {
    projectId,
    publicAnonKey,
} from "../utils/supabase/info";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import {
    BookOpen,
    Newspaper,
    Trash2,
    Plus,
    ArrowLeft,
} from "lucide-react";
import { Navbar } from "../components/Navbar";

export default function AdminDashboard() {
    const { user, accessToken } = useAuth();
    const [courses, setCourses] = useState<any[]>([]);
    const [news, setNews] = useState<any[]>([]);

    useEffect(() => {
        if (user?.role === "admin") {
            fetchAllData();
        }
    }, [user]);

    const fetchAllData = async () => {
        await Promise.all([fetchCourses(), fetchNews()]);
    };

    const fetchCourses = async () => {
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/courses`,
                {
                    headers: { Authorization: `Bearer ${publicAnonKey}` },
                },
            );
            const data = await response.json();
            setCourses(data.courses || []);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    const fetchNews = async () => {
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/news`,
                {
                    headers: { Authorization: `Bearer ${publicAnonKey}` },
                },
            );
            const data = await response.json();
            setNews(data.news || []);
        } catch (error) {
            console.error("Failed to fetch news:", error);
        }
    };

    const deleteCourse = async (courseId: string) => {
        if (
            !confirm("Apakah Anda yakin ingin menghapus kursus ini?")
        )
            return;

        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/courses/${courseId}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${accessToken}` },
                },
            );
            if (response.ok) {
                await fetchCourses();
            }
        } catch (error) {
            console.error("Failed to delete course:", error);
        }
    };

    const deleteNews = async (newsId: string) => {
        if (
            !confirm("Apakah Anda yakin ingin menghapus berita ini?")
        )
            return;

        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/news/${newsId}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${accessToken}` },
                },
            );
            if (response.ok) {
                await fetchNews();
            }
        } catch (error) {
            console.error("Failed to delete news:", error);
        }
    };

    if (user?.role !== "admin" && user?.role !== "superadmin") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center">
                    <h2 className="text-2xl mb-4">Akses Ditolak</h2>
                    <p className="text-gray-600 mb-4">
                        Anda tidak memiliki akses ke halaman ini.
                    </p>
                    <Button onClick={() => (window.location.href = "#/")}>
                        Kembali ke Beranda
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <Button
                        variant="outline"
                        className="mb-4"
                        onClick={() => (window.location.href = "#/")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Beranda
                    </Button>
                    <h1 className="text-3xl text-gray-900">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Kelola kursus dan berita platform EduLearn
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total Courses
                                </p>
                                <p className="text-3xl text-gray-900 mt-2">
                                    {courses.length}
                                </p>
                            </div>
                            <BookOpen className="w-12 h-12 text-blue-600" />
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total News
                                </p>
                                <p className="text-3xl text-gray-900 mt-2">
                                    {news.length}
                                </p>
                            </div>
                            <Newspaper className="w-12 h-12 text-green-600" />
                        </div>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="courses" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="courses">Courses</TabsTrigger>
                        <TabsTrigger value="news">News</TabsTrigger>
                    </TabsList>

                    {/* Courses Tab */}
                    <TabsContent value="courses">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl text-gray-900">
                                    Manage Courses
                                </h2>
                                <CreateCourseDialog
                                    onSuccess={fetchCourses}
                                    accessToken={accessToken}
                                />
                            </div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Created At</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {courses.map((course) => (
                                            <TableRow key={course.id}>
                                                <TableCell>{course.title}</TableCell>
                                                <TableCell>{course.category}</TableCell>
                                                <TableCell>{course.price}</TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        course.createdAt,
                                                    ).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            deleteCourse(course.id)
                                                        }
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {courses.length === 0 && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={5}
                                                    className="text-center text-gray-500"
                                                >
                                                    Belum ada kursus. Tambahkan kursus
                                                    pertama Anda!
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* News Tab */}
                    <TabsContent value="news">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl text-gray-900">
                                    Manage News
                                </h2>
                                <CreateNewsDialog
                                    onSuccess={fetchNews}
                                    accessToken={accessToken}
                                />
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px]">Title</TableHead>
                                            <TableHead className="w-[250px]">Description</TableHead>
                                            <TableHead>Author</TableHead>
                                            <TableHead>Created At</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {news.map((item) => (
                                            <TableRow key={item.id}>
                                                {/* Title */}
                                                <TableCell>{item.title}</TableCell>

                                                {/* Description (preview 1 baris, strip HTML) */}
                                                <TableCell className="max-w-[250px]">
                                                    <p className="truncate text-gray-600">
                                                        {stripHtml(item.description)}
                                                    </p>
                                                </TableCell>

                                                {/* Author */}
                                                <TableCell>{item.author}</TableCell>

                                                {/* Created */}
                                                <TableCell>
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </TableCell>

                                                {/* Actions */}
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteNews(item.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {news.length === 0 && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={5}
                                                    className="text-center text-gray-500"
                                                >
                                                    Belum ada berita. Tambahkan berita pertama Anda!
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    );
}

// Create Course Dialog Component
function CreateCourseDialog({
    onSuccess,
    accessToken,
}: {
    onSuccess: () => void;
    accessToken: string | null;
}) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        instructor: "",
        duration: "",
        level: "Pemula",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/courses`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(formData),
                },
            );
            if (response.ok) {
                setOpen(false);
                setFormData({
                    title: "",
                    description: "",
                    category: "",
                    price: "",
                    instructor: "",
                    duration: "",
                    level: "Pemula",
                });
                onSuccess();
            }
        } catch (error) {
            console.error("Failed to create course:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600">
                    <Plus className="w-4 h-4" />
                    Add Course
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>
                        Add a new course to the platform
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Title</Label>
                        <Input
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            placeholder="Complete Web Development Bootcamp 2024"
                            required
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <textarea
                            className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Deskripsi lengkap kursus..."
                            required
                        />
                    </div>
                    <div>
                        <Label>Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) =>
                                setFormData({ ...formData, category: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pemrograman">
                                    Pemrograman
                                </SelectItem>
                                <SelectItem value="Desain">Desain</SelectItem>
                                <SelectItem value="Bisnis">Bisnis</SelectItem>
                                <SelectItem value="Data Science">
                                    Data Science
                                </SelectItem>
                                <SelectItem value="Mobile Dev">
                                    Mobile Dev
                                </SelectItem>
                                <SelectItem value="Database">
                                    Database
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Instructor</Label>
                        <Input
                            value={formData.instructor}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    instructor: e.target.value,
                                })
                            }
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <Label>Price</Label>
                        <Input
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    price: e.target.value,
                                })
                            }
                            placeholder="Rp 299.000"
                            required
                        />
                    </div>
                    <div>
                        <Label>Duration</Label>
                        <Input
                            value={formData.duration}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    duration: e.target.value,
                                })
                            }
                            placeholder="42 jam"
                            required
                        />
                    </div>
                    <div>
                        <Label>Level</Label>
                        <Select
                            value={formData.level}
                            onValueChange={(value) =>
                                setFormData({ ...formData, level: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pemula">Pemula</SelectItem>
                                <SelectItem value="Menengah">
                                    Menengah
                                </SelectItem>
                                <SelectItem value="Lanjutan">
                                    Lanjutan
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                        Create Course
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// Create News Dialog Component
function CreateNewsDialog({
    onSuccess,
    accessToken,
}: {
    onSuccess: () => void;
    accessToken: string | null;
}) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/news`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(formData),
                },
            );
            if (response.ok) {
                setOpen(false);
                setFormData({ title: "", content: "" });
                onSuccess();
            }
        } catch (error) {
            console.error("Failed to create news:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600">
                    <Plus className="w-4 h-4" />
                    Add News
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create News Article</DialogTitle>
                    <DialogDescription>
                        Add a new news article to the platform
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Title</Label>
                        <Input
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            placeholder="Judul berita..."
                            required
                        />
                    </div>
                    <div>
                        <Label>Content</Label>
                        <textarea
                            className="w-full min-h-[200px] px-3 py-2 border rounded-md"
                            value={formData.content}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    content: e.target.value,
                                })
                            }
                            placeholder="Konten berita..."
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                        Create News
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}