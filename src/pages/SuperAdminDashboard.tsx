import { useEffect, useState } from 'react';
import { useAuth } from '../utils/auth-context';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import { Users, BookOpen, Newspaper, Trash2, Edit, Plus, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export default function SuperAdminDashboard() {
    const { user, accessToken } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentDialog, setCurrentDialog] = useState<'user' | 'course' | 'news' | null>(null);

    useEffect(() => {
        if (user?.role === 'superadmin') {
            fetchAllData();
        }
    }, [user]);

    const fetchAllData = async () => {
        await Promise.all([fetchUsers(), fetchCourses(), fetchNews()]);
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/users`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            const data = await response.json();
            setUsers(data.users || []);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/courses`,
                {
                    headers: { Authorization: `Bearer ${publicAnonKey}` },
                }
            );
            const data = await response.json();
            setCourses(data.courses || []);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    const fetchNews = async () => {
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/news`,
                {
                    headers: { Authorization: `Bearer ${publicAnonKey}` },
                }
            );
            const data = await response.json();
            setNews(data.news || []);
        } catch (error) {
            console.error('Failed to fetch news:', error);
        }
    };

    const deleteUser = async (userId: string) => {
        if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return;

        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/users/${userId}`,
                {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            if (response.ok) {
                await fetchUsers();
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const deleteCourse = async (courseId: string) => {
        if (!confirm('Apakah Anda yakin ingin menghapus kursus ini?')) return;

        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/courses/${courseId}`,
                {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            if (response.ok) {
                await fetchCourses();
            }
        } catch (error) {
            console.error('Failed to delete course:', error);
        }
    };

    const deleteNews = async (newsId: string) => {
        if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;

        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/news/${newsId}`,
                {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            if (response.ok) {
                await fetchNews();
            }
        } catch (error) {
            console.error('Failed to delete news:', error);
        }
    };

    if (user?.role !== 'superadmin') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center">
                    <h2 className="text-2xl mb-4">Akses Ditolak</h2>
                    <p className="text-gray-600 mb-4">Anda tidak memiliki akses ke halaman ini.</p>
                    <Button onClick={() => window.location.href = '#/'}>
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
                        onClick={() => window.location.href = '#/'}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Beranda
                    </Button>
                    <h1 className="text-3xl text-gray-900">SuperAdmin Dashboard</h1>
                    <p className="text-gray-600 mt-2">Kelola semua aspek platform EduLearn</p>
                </div>

                {/* Stats Cards */}
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Users</p>
                                <p className="text-3xl text-gray-900 mt-2">{users.length}</p>
                            </div>
                            <Users className="w-12 h-12 text-purple-600" />
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Courses</p>
                                <p className="text-3xl text-gray-900 mt-2">{courses.length}</p>
                            </div>
                            <BookOpen className="w-12 h-12 text-blue-600" />
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total News</p>
                                <p className="text-3xl text-gray-900 mt-2">{news.length}</p>
                            </div>
                            <Newspaper className="w-12 h-12 text-green-600" />
                        </div>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="users" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="courses">Courses</TabsTrigger>
                        <TabsTrigger value="news">News</TabsTrigger>
                    </TabsList>

                    {/* Users Tab */}
                    <TabsContent value="users">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl text-gray-900">Manage Users</h2>
                                <CreateUserDialog onSuccess={fetchUsers} accessToken={accessToken} />
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((u) => (
                                        <TableRow key={u.id}>
                                            <TableCell>{u.name}</TableCell>
                                            <TableCell>{u.email}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded text-xs ${u.role === 'superadmin' ? 'bg-red-100 text-red-700' :
                                                        u.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {u.role}
                                                </span>
                                            </TableCell>
                                            <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteUser(u.id)}
                                                    disabled={u.id === user?.id}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>

                    {/* Courses Tab */}
                    <TabsContent value="courses">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl text-gray-900">Manage Courses</h2>
                                <CreateCourseDialog onSuccess={fetchCourses} accessToken={accessToken} />
                            </div>
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
                                            <TableCell>{new Date(course.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" onClick={() => deleteCourse(course.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>

                    {/* News Tab */}
                    <TabsContent value="news">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl text-gray-900">Manage News</h2>
                                <CreateNewsDialog onSuccess={fetchNews} accessToken={accessToken} />
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {news.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.author}</TableCell>
                                            <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" onClick={() => deleteNews(item.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

// Create User Dialog Component
function CreateUserDialog({ onSuccess, accessToken }: { onSuccess: () => void; accessToken: string | null }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/users`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (response.ok) {
                setOpen(false);
                setFormData({ name: '', email: '', password: '', role: 'student' });
                onSuccess();
            }
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>Add a new user to the platform</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength={6}
                        />
                    </div>
                    <div>
                        <Label>Role</Label>
                        <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="superadmin">SuperAdmin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full">Create User</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// Create Course Dialog Component
function CreateCourseDialog({ onSuccess, accessToken }: { onSuccess: () => void; accessToken: string | null }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        instructor: '',
        duration: '',
        level: 'Pemula',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/courses`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (response.ok) {
                setOpen(false);
                setFormData({ title: '', description: '', category: '', price: '', instructor: '', duration: '', level: 'Pemula' });
                onSuccess();
            }
        } catch (error) {
            console.error('Failed to create course:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Course
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>Add a new course to the platform</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Title</Label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label>Category</Label>
                        <Input
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label>Instructor</Label>
                        <Input
                            value={formData.instructor}
                            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label>Price</Label>
                        <Input
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="Rp 299.000"
                            required
                        />
                    </div>
                    <div>
                        <Label>Duration</Label>
                        <Input
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            placeholder="42 jam"
                            required
                        />
                    </div>
                    <div>
                        <Label>Level</Label>
                        <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pemula">Pemula</SelectItem>
                                <SelectItem value="Menengah">Menengah</SelectItem>
                                <SelectItem value="Lanjutan">Lanjutan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full">Create Course</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// Create News Dialog Component
function CreateNewsDialog({ onSuccess, accessToken }: { onSuccess: () => void; accessToken: string | null }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/news`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (response.ok) {
                setOpen(false);
                setFormData({ title: '', content: '' });
                onSuccess();
            }
        } catch (error) {
            console.error('Failed to create news:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add News
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create News Article</DialogTitle>
                    <DialogDescription>Add a new news article to the platform</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Title</Label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label>Content</Label>
                        <textarea
                            className="w-full min-h-[150px] px-3 py-2 border rounded-md"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Create News</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
