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
import { Users, BookOpen, Newspaper, Trash2, Edit, Plus, ArrowLeft, Eye } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export default function SuperAdminDashboard() {
    const { user, accessToken } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentDialog, setCurrentDialog] = useState<'user' | 'course' | 'news' | null>(null);
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalNews, setTotalNews] = useState(0);
    //user
    const [userPage, setUserPage] = useState(1);
    const [userLimit, setUserLimit] = useState(10);
    const [userTotalPages, setUserTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [filterNama, setFilterNama] = useState("");
    const [detailUser, setDetailUser] = useState<any>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState<any>({});

    // NEWS
    interface NewsItem {
        id: number;
        title: string;
        description: string;
        author: string;
        createdAt: string;
        updateAt: string;
    }
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [news, setNews] = useState([]);
    const [newsPage, setNewsPage] = useState(1);
    const [newsLimit, setNewsLimit] = useState(10);
    const [newsTotalPages, setNewsTotalPages] = useState(1);
    const [newsTotalData, setNewsTotalData] = useState(0);
    const [filterTitle, setFilterTitle] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [detailNews, setDetailNews] = useState(null);
    const [showNewsModal, setShowNewsModal] = useState(false);
    const [isEditNews, setIsEditNews] = useState(false);
    const [newsForm, setNewsForm] = useState({});
    const [filterNewsTitle, setFilterNewsTitle] = useState("");
    const [showAddNewsModal, setShowAddNewsModal] = useState(false);
    const [addNewsData, setAddNewsData] = useState({
        title: "",
        description: "",
    });

    //jasa
    interface ProductItem {
        id: number;
        title: string;
        description: string;
        category: string;
        author: string;
        createdAt: string;
        updateAt: string;
    }
    // PRODUCT (Jasa)
    const [productList, setProductList] = useState<ProductItem[]>([]);
    const [productPage, setProductPage] = useState(1);
    const [productLimit, setProductLimit] = useState(10);
    const [productTotalPages, setProductTotalPages] = useState(1);
    const [productTotalData, setProductTotalData] = useState(0);
    const [filterProductTitle, setFilterProductTitle] = useState("");
    const [filterProductCategory, setFilterProductCategory] = useState("");
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [addProductData, setAddProductData] = useState({
        title: "",
        description: "",
        category: ""
    });
    const [detailProduct, setDetailProduct] = useState(null);
    const [productForm, setProductForm] = useState({});
    const [showProductModal, setShowProductModal] = useState(false);
    const [isEditProduct, setIsEditProduct] = useState(false);

    // TRAINING
    interface TrainingItem {
        id: number;
        trainingTitle: string;
        description: string;
        trainingMaterials: string[];
        institutionName: string;
        duration: string;
        minimumParticipants: string;
        facilities: string[];
        implementationSchedule: string;
        competencyTestPlace: string;
        certificate: string[];
        trainingFee: string;
        author: string;
        createdAt: string;
        updateAt: string;
    }

    const [trainingList, setTrainingList] = useState<TrainingItem[]>([]);
    const [trainingPage, setTrainingPage] = useState(1);
    const [trainingLimit, setTrainingLimit] = useState(10);
    const [trainingTotalPages, setTrainingTotalPages] = useState(1);
    const [trainingTotalData, setTrainingTotalData] = useState(0);
    const [filterTrainingTitle, setFilterTrainingTitle] = useState("");
    const [detailTraining, setDetailTraining] = useState<any>(null);
    const [showTrainingModal, setShowTrainingModal] = useState(false);
    const [isEditTraining, setIsEditTraining] = useState(false);
    const [trainingForm, setTrainingForm] = useState<any>({});
    const [showAddTrainingModal, setShowAddTrainingModal] = useState(false);
    const [addTrainingData, setAddTrainingData] = useState({
        trainingTitle: "",
        description: "",
        trainingMaterials: [""],
        institutionName: "",
        duration: "",
        minimumParticipants: "",
        facilities: [""],
        implementationSchedule: "",
        competencyTestPlace: "",
        certificate: [""],
        trainingFee: "",
    });

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (user?.role === 'superadmin') {
            fetchAllData();
        }
    }, [user]);

    const fetchAllData = async () => {
        await Promise.all([fetchUsers(), fetchTraining(), fetchNews()]);
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await fetch(`${API_BASE}/api/users/user-pagination`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify({
                    sortBy: "id",
                    sortOrder: "desc",
                    limit: String(userLimit),
                    page: String(userPage),
                    filters: { nama: filterNama || "", email: "", noHp: "" }
                })
            });

            const data = await response.json();

            console.log("RESPONSE USERS:", data);

            setUsers(data.data || []);
            setUserTotalPages(data.totalPages || 1);
            setTotalUsers(data.countData || 0);

        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const deleteUser = async (email: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;

        try {
            const token = localStorage.getItem("accessToken");

            const response = await fetch(`${API_BASE}/api/users/delete-user`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.code === "00") {
                await fetchUsers();
            }
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const getDetailUser = async (email: string) => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await fetch(`${API_BASE}/api/users/get-detail-by-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.code === "00") {
                setDetailUser(data.data);
                setShowDetailModal(true);
                setFormData(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch detail:", error);
        }
    };

    const updateUser = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await fetch(`${API_BASE}/api/users/update-data-user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.code === "00") {
                setDetailUser(data.data);
                setIsEdit(false);
                await fetchUsers();
            }
        } catch (error) {
            console.error("Failed to update", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [userPage, userLimit, filterNama]);

    //news state
    const fetchNews = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/news/paginaton`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sortBy: "id",
                    sortOrder: "desc",
                    limit: String(newsLimit),
                    page: String(newsPage),
                    filters: { title: filterNewsTitle, author: "" }
                })
            });

            const data = await res.json();

            if (data.code === "00") {
                setNewsList(data.data || []);
                setNewsTotalPages(data.totalPages || 1);
                setNewsTotalData(data.countData || 0);
            }
        } catch (e) {
            console.error("Error fetch news:", e);
        }
    };

    const getDetailNews = async (id: number) => {
        try {
            const response = await fetch(`${API_BASE}/api/news/detail`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: String(id) })
            });

            const data = await response.json();

            if (data.code === "00") {
                setDetailNews(data.data);
                setShowNewsModal(true);
                setNewsForm(data.data);
            }
        } catch (err) {
            console.error("Get detail news error:", err);
        }
    };

    const updateNews = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await fetch(`${API_BASE}/api/news/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newsForm)
            });

            const data = await response.json();

            if (data.code === "00") {
                setDetailNews(data.data);
                setIsEditNews(false);
                await fetchNews();
            }

        } catch (err) {
            console.error("Update news error:", err);
        }
    };

    const deleteNews = async (id: number) => {
        if (!confirm("Hapus berita ini?")) return;

        try {
            const token = localStorage.getItem("accessToken");

            const response = await fetch(`${API_BASE}/api/news/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id: String(id) })
            });

            const data = await response.json();

            if (data.code === "00") {
                await fetchNews();
            }

        } catch (err) {
            console.error("Delete news error:", err);
        }
    };

    const createNews = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`${API_BASE}/api/news/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(addNewsData)
            });

            const data = await res.json();

            if (data.code === "00") {
                setShowAddNewsModal(false);
                setAddNewsData({ title: "", description: "" });
                fetchNews();
            }
        } catch (e) {
            console.error("Failed create news:", e);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [newsPage, newsLimit, filterNewsTitle]);

    //jasa state
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/product/pagination`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sortBy: "id",
                    sortOrder: "desc",
                    limit: String(productLimit),
                    page: String(productPage),
                    filters: {
                        title: filterProductTitle,
                        author: "",
                        category: filterProductCategory
                    }
                })
            });

            const data = await res.json();
            if (data.code === "00") {
                setProductList(data.data || []);
                setProductTotalPages(data.totalPages || 1);
                setProductTotalData(data.countData || 0);
            }
        } catch (err) {
            console.error("Fetch product error:", err);
        }
    };

    const getDetailProduct = async (id: number) => {
        try {
            const res = await fetch(`${API_BASE}/api/product/detail`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: String(id) })
            });

            const data = await res.json();

            if (data.code === "00") {
                setDetailProduct(data.data);
                setProductForm(data.data);
                setShowProductModal(true);
            }

        } catch (err) {
            console.error("Get product detail error:", err);
        }
    };
    const createProduct = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`${API_BASE}/api/product/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(addProductData)
            });

            const data = await res.json();
            if (data.code === "00") {
                setShowAddProductModal(false);
                setAddProductData({ title: "", description: "", category: "Jasa" });
                fetchProducts();
            }

        } catch (err) {
            console.error("Create product error:", err);
        }
    };

    const updateProduct = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`${API_BASE}/api/product/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(productForm)
            });

            const data = await res.json();
            if (data.code === "00") {
                setIsEditProduct(false);
                fetchProducts();
            }

        } catch (err) {
            console.error("Update product error:", err);
        }
    };

    const deleteProduct = async (id: number) => {
        if (!confirm("Hapus jasa ini?")) return;

        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`${API_BASE}/api/product/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id: String(id) })
            });

            const data = await res.json();
            if (data.code === "00") fetchProducts();

        } catch (err) {
            console.error("Delete product error:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [productPage, productLimit, filterProductTitle, filterProductCategory]);

    // training
    const fetchTraining = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/training/pagination`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sortBy: "id",
                    sortOrder: "desc",
                    limit: String(trainingLimit),
                    page: String(trainingPage),
                    filters: { trainingTitle: filterTrainingTitle, author: "" }
                })
            });

            const data = await res.json();

            if (data.code === "00") {
                setTrainingList(data.data || []);
                setTrainingTotalPages(data.totalPages || 1);
                setTrainingTotalData(data.countData || 0);
            }
        } catch (e) {
            console.error("Error fetch training:", e);
        }
    };


    const getDetailTraining = async (id: number) => {
        try {
            const response = await fetch(`${API_BASE}/api/training/detail`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: String(id) })
            });

            const data = await response.json();

            if (data.code === "00") {
                setDetailTraining(data.data);
                setTrainingForm(data.data);
                setShowTrainingModal(true);
            }

        } catch (err) {
            console.error("Detail training error:", err);
        }
    };

    const createTraining = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            // VALIDASI WAJIB
            if (!addTrainingData.competencyTestPlace.trim()) {
                alert("Competency Test Place wajib diisi");
                return;
            }

            // BERSIHKAN ARRAY
            const cleanedData = {
                ...addTrainingData,
                trainingMaterials: addTrainingData.trainingMaterials.filter(i => i.trim() !== ""),
                facilities: addTrainingData.facilities.filter(i => i.trim() !== ""),
                certificate: addTrainingData.certificate.filter(i => i.trim() !== "")
            };

            const res = await fetch(`${API_BASE}/api/training/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(cleanedData)
            });

            const data = await res.json();

            if (data.code === "00") {
                setShowAddTrainingModal(false);
                fetchTraining();

                // RESET
                setAddTrainingData({
                    trainingTitle: "",
                    description: "",
                    trainingMaterials: [""],
                    institutionName: "",
                    duration: "",
                    minimumParticipants: "",
                    facilities: [""],
                    implementationSchedule: "",
                    competencyTestPlace: "",
                    certificate: [""],
                    trainingFee: ""
                });
            }

        } catch (e) {
            console.error("Create training error:", e);
        }
    };



    const updateTraining = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`${API_BASE}/api/training/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(trainingForm)
            });

            const data = await res.json();

            if (data.code === "00") {
                setIsEditTraining(false);
                setDetailTraining(data.data);
                fetchTraining();
            }
        } catch (err) {
            console.error("Update training error:", err);
        }
    };

    const deleteTraining = async (id: number) => {
        if (!confirm("Hapus training ini?")) return;

        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`${API_BASE}/api/training/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id: String(id) })
            });

            const data = await res.json();

            if (data.code === "00") {
                fetchTraining();
            }

        } catch (err) {
            console.error("Delete training error:", err);
        }
    };

    useEffect(() => {
        fetchTraining();
    }, [trainingPage, trainingLimit, filterTrainingTitle]);

    const updateArrayField = (field: string, index: number, value: string) => {
        setTrainingForm((prev: any) => {
            const copy = { ...prev };
            copy[field][index] = value;
            return copy;
        });
    };

    const addArrayField = (field: string) => {
        setTrainingForm((prev: any) => ({
            ...prev,
            [field]: [...prev[field], ""]
        }));
    };

    const updateArrayAddForm = (field: string, index: number, value: string) => {
        setAddTrainingData((prev: any) => {
            const copy = { ...prev };
            copy[field][index] = value;
            return copy;
        });
    };

    const addArrayAddForm = (field: string) => {
        setAddTrainingData((prev: any) => ({
            ...prev,
            [field]: [...prev[field], ""]
        }));
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
                                <p className="text-3xl text-gray-900 mt-2">{totalUsers}</p>
                            </div>
                            <Users className="w-12 h-12 text-purple-600" />
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Courses</p>
                                <p className="text-3xl text-gray-900 mt-2">{trainingTotalData}</p>
                            </div>
                            <BookOpen className="w-12 h-12 text-blue-600" />
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total News</p>
                                <p className="text-3xl text-gray-900 mt-2">{newsTotalData}</p>
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
                        <TabsTrigger value="Jasa">Jasa</TabsTrigger>
                        <TabsTrigger value="news">Training Participant</TabsTrigger>
                    </TabsList>

                    {/* Users Tab */}
                    <TabsContent value="users">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl text-gray-900">Manage Users</h2>
                                {/* Filter Nama */}
                                <input
                                    type="text"
                                    placeholder="Filter by name..."
                                    value={filterNama}
                                    onChange={(e) => {
                                        setFilterNama(e.target.value);
                                        setUserPage(1);
                                    }}
                                    className="border rounded px-3 py-2 text-sm sm:w-60"
                                />
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Participant</TableHead>
                                        <TableHead>Identity No</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>University</TableHead>
                                        <TableHead>Education Field</TableHead>
                                        <TableHead>Major</TableHead>
                                        <TableHead>City</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Updated At</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {users.map((u) => (
                                        <TableRow key={u.id}>
                                            <TableCell>{u.name}</TableCell>
                                            <TableCell>{u.email}</TableCell>
                                            <TableCell>{u.phoneNumber}</TableCell>

                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded text-xs ${u.role === 'superadmin'
                                                        ? 'bg-red-100 text-red-700'
                                                        : u.role === 'admin'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    {u.role}
                                                </span>
                                            </TableCell>

                                            <TableCell>{u.participantType}</TableCell>
                                            <TableCell>{u.identityNumber}</TableCell>
                                            <TableCell>{u.gender}</TableCell>
                                            <TableCell>{u.universityName}</TableCell>
                                            <TableCell>{u.lastEducationField}</TableCell>
                                            <TableCell>{u.majorStudyProgram}</TableCell>
                                            <TableCell>{u.cityOfResidence}</TableCell>
                                            <TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>{new Date(u.updateAt).toLocaleString()}</TableCell>
                                            <TableCell className="flex gap-2">
                                                {/* Lihat Detail */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => getDetailUser(u.email)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>

                                                {/* Delete */}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteUser(u.email)}
                                                    disabled={u.id === user?.id}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* Pagination */}
                            <div className="flex justify-end items-center gap-4 mt-4">

                                {/* Limit Selector */}
                                <select
                                    value={userLimit}
                                    onChange={(e) => {
                                        setUserLimit(Number(e.target.value));
                                        setUserPage(1); // reset ke page 1 kalau ganti limit
                                    }}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value={10}>10</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>

                                {/* Prev Button */}
                                <Button
                                    onClick={() => setUserPage((p) => Math.max(1, p - 1))}
                                    disabled={userPage === 1}
                                    variant="outline"
                                >
                                    Prev
                                </Button>

                                {/* Page Indicator */}
                                <span className="text-sm text-gray-600">
                                    Page {userPage} of {userTotalPages}
                                </span>

                                {/* Next Button */}
                                <Button
                                    onClick={() => setUserPage((p) => Math.min(userTotalPages, p + 1))}
                                    disabled={userPage === userTotalPages}
                                    variant="outline"
                                >
                                    Next
                                </Button>
                            </div>
                        </Card>
                    </TabsContent>

                    <Dialog open={showDetailModal} onOpenChange={(v) => {
                        setShowDetailModal(v);
                        if (!v) setIsEdit(false);
                    }}>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Detail User</DialogTitle>
                            </DialogHeader>

                            {detailUser && (
                                <div className="space-y-3 text-sm">

                                    {/* NAMA */}
                                    <div>
                                        <label className="block mb-1">Nama</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.name || ""}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* EMAIL read only */}
                                    <div>
                                        <label className="block mb-1">Email</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={formData.email}
                                            className="w-full border bg-gray-100 rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* PHONE */}
                                    <div>
                                        <label className="block mb-1">No HP</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.phoneNumber || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phoneNumber: e.target.value })
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* PARTICIPANT TYPE */}
                                    <div>
                                        <label className="block mb-1">Participant Type</label>
                                        <select
                                            disabled={!isEdit}
                                            value={formData.participantType || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, participantType: e.target.value })
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        >
                                            <option value="Dosen">Dosen</option>
                                            <option value="Umum">Umum</option>
                                            <option value="Industri">Industri</option>
                                        </select>
                                    </div>

                                    {/* GENDER */}
                                    <div>
                                        <label className="block mb-1">Gender</label>
                                        <select
                                            disabled={!isEdit}
                                            value={formData.gender || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, gender: e.target.value })
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        >
                                            <option value="Laki-laki">Laki-laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </div>

                                    {/* Identity */}
                                    <div>
                                        <label className="block mb-1">Identity Number</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.identityNumber || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, identityNumber: e.target.value })
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* University */}
                                    <div>
                                        <label className="block mb-1">Universitas</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.universityName || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, universityName: e.target.value })
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* Education */}
                                    <div>
                                        <label className="block mb-1">Bidang Pendidikan</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.lastEducationField || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, lastEducationField: e.target.value })
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* Major */}
                                    <div>
                                        <label className="block mb-1">Program Studi</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.majorStudyProgram || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, majorStudyProgram: e.target.value })
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label className="block mb-1">Kota Domisili</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.cityOfResidence || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, cityOfResidence: e.target.value })
                                            }
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* BUTTON ACTIONS */}
                                    <div className="flex justify-end gap-3 mt-4">

                                        {!isEdit && (
                                            <Button onClick={() => setIsEdit(true)} variant="default">
                                                Edit User
                                            </Button>
                                        )}

                                        {isEdit && (
                                            <>
                                                <Button onClick={() => setIsEdit(false)} variant="outline">
                                                    Batal
                                                </Button>

                                                <Button onClick={updateUser} variant="default">
                                                    Simpan
                                                </Button>
                                            </>
                                        )}
                                    </div>

                                </div>
                            )}
                        </DialogContent>
                    </Dialog>

                    {/* training Tab */}
                    <TabsContent value="courses">
                        <Card className="p-6">

                            {/* HEADER + FILTER */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl text-gray-900">Manage Training</h2>

                                <div className="flex items-center gap-3 ml-auto">
                                    <input
                                        type="text"
                                        placeholder="Filter title..."
                                        value={filterTrainingTitle}
                                        onChange={(e) => {
                                            setFilterTrainingTitle(e.target.value);
                                            setTrainingPage(1);
                                        }}
                                        className="border rounded px-3 py-2 text-sm w-60"
                                    />

                                    <Button onClick={() => setShowAddTrainingModal(true)}>
                                        Add Training
                                    </Button>
                                </div>
                            </div>

                            {/* TABLE */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Materials</TableHead>
                                        <TableHead>Institution</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Min Participants</TableHead>
                                        <TableHead>Facilities</TableHead>
                                        <TableHead>Schedule</TableHead>
                                        <TableHead>Competency Test Place</TableHead>
                                        <TableHead>Certificate</TableHead>
                                        <TableHead>Training Fee</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Updated</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {trainingList.map((t) => (
                                        <TableRow key={t.id}>
                                            <TableCell>{t.id}</TableCell>

                                            <TableCell>{t.trainingTitle}</TableCell>

                                            <TableCell>{t.description}</TableCell>

                                            {/* MATERIALS turun ke bawah */}
                                            <TableCell>
                                                {Array.isArray(t.trainingMaterials) && t.trainingMaterials.length > 0 ? (
                                                    <ul className="list-disc pl-4">
                                                        {t.trainingMaterials.map((m, i) => (
                                                            <li key={i}>{m}</li>
                                                        ))}
                                                    </ul>
                                                ) : "-"}
                                            </TableCell>

                                            <TableCell>{t.institutionName}</TableCell>

                                            <TableCell>{t.duration}</TableCell>

                                            <TableCell>{t.minimumParticipants}</TableCell>

                                            {/* FACILITIES turun ke bawah */}
                                            <TableCell>
                                                {Array.isArray(t.facilities) && t.facilities.length > 0 ? (
                                                    <ul className="list-disc pl-4">
                                                        {t.facilities.map((f, i) => (
                                                            <li key={i}>{f}</li>
                                                        ))}
                                                    </ul>
                                                ) : "-"}
                                            </TableCell>

                                            <TableCell>{t.implementationSchedule}</TableCell>

                                            <TableCell>{t.competencyTestPlace}</TableCell>

                                            {/* CERTIFICATE turun ke bawah */}
                                            <TableCell>
                                                {Array.isArray(t.certificate) && t.certificate.length > 0 ? (
                                                    <ul className="list-disc pl-4">
                                                        {t.certificate.map((c, i) => (
                                                            <li key={i}>{c}</li>
                                                        ))}
                                                    </ul>
                                                ) : "-"}
                                            </TableCell>

                                            <TableCell>{Number(t.trainingFee).toLocaleString("id-ID")}</TableCell>

                                            <TableCell>{t.author}</TableCell>

                                            <TableCell>
                                                {new Date(t.createdAt).toLocaleString()}
                                            </TableCell>

                                            <TableCell>
                                                {new Date(t.updateAt).toLocaleString()}
                                            </TableCell>

                                            <TableCell className="flex gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => getDetailTraining(t.id)}>
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => deleteTraining(t.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>



                            {/* PAGINATION */}
                            <div className="flex justify-end items-center gap-4 mt-4">
                                <select
                                    value={trainingLimit}
                                    onChange={(e) => {
                                        setTrainingLimit(Number(e.target.value));
                                        setTrainingPage(1);
                                    }}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value={10}>10</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>

                                <Button
                                    onClick={() => setTrainingPage((p) => Math.max(1, p - 1))}
                                    disabled={trainingPage === 1}
                                    variant="outline"
                                >
                                    Prev
                                </Button>

                                <span className="text-sm text-gray-600">
                                    Page {trainingPage} of {trainingTotalPages}
                                </span>

                                <Button
                                    onClick={() => setTrainingPage((p) => Math.min(trainingTotalPages, p + 1))}
                                    disabled={trainingPage === trainingTotalPages}
                                    variant="outline"
                                >
                                    Next
                                </Button>
                            </div>

                        </Card>
                    </TabsContent>

                    {/* CREATE TRAINING MODAL */}
                    <Dialog open={showAddTrainingModal} onOpenChange={setShowAddTrainingModal}>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Create Training</DialogTitle>
                            </DialogHeader>

                            {/* FORM 2 COLUMN */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                                {/* Training Title */}
                                <div>
                                    <label className="block mb-1">Training Title</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={addTrainingData.trainingTitle}
                                        onChange={(e) =>
                                            setAddTrainingData({
                                                ...addTrainingData,
                                                trainingTitle: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Institution */}
                                <div>
                                    <label className="block mb-1">Institution Name</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={addTrainingData.institutionName}
                                        onChange={(e) =>
                                            setAddTrainingData({
                                                ...addTrainingData,
                                                institutionName: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block mb-1">Description</label>
                                    <textarea
                                        className="w-full border rounded px-3 py-2 h-24"
                                        value={addTrainingData.description}
                                        onChange={(e) =>
                                            setAddTrainingData({
                                                ...addTrainingData,
                                                description: e.target.value,
                                            })
                                        }
                                    ></textarea>
                                </div>

                                {/* Training Materials */}
                                <div className="md:col-span-2">
                                    <label className="block mb-1">Training Materials</label>

                                    {addTrainingData.trainingMaterials.map((val, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                className="w-full border rounded px-3 py-2"
                                                value={val}
                                                onChange={(e) => {
                                                    const updated = [...addTrainingData.trainingMaterials];
                                                    updated[idx] = e.target.value;
                                                    setAddTrainingData({
                                                        ...addTrainingData,
                                                        trainingMaterials: updated,
                                                    });
                                                }}
                                            />
                                            <button
                                                className="px-3 bg-red-500 text-white rounded"
                                                onClick={() => {
                                                    const updated = addTrainingData.trainingMaterials.filter(
                                                        (_, i) => i !== idx
                                                    );
                                                    setAddTrainingData({
                                                        ...addTrainingData,
                                                        trainingMaterials: updated,
                                                    });
                                                }}
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        className="text-blue-600 text-xs mt-1"
                                        onClick={() =>
                                            setAddTrainingData({
                                                ...addTrainingData,
                                                trainingMaterials: [
                                                    ...addTrainingData.trainingMaterials,
                                                    "",
                                                ],
                                            })
                                        }
                                    >
                                        + Add Material
                                    </button>
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block mb-1">Duration</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={addTrainingData.duration}
                                        onChange={(e) =>
                                            setAddTrainingData({
                                                ...addTrainingData,
                                                duration: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Minimum Participants */}
                                <div>
                                    <label className="block mb-1">Minimum Participants</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={addTrainingData.minimumParticipants}
                                        onChange={(e) =>
                                            setAddTrainingData({
                                                ...addTrainingData,
                                                minimumParticipants: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Facilities */}
                                <div className="md:col-span-2">
                                    <label className="block mb-1">Facilities</label>

                                    {addTrainingData.facilities.map((val, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                className="w-full border rounded px-3 py-2"
                                                value={val}
                                                onChange={(e) => {
                                                    const updated = [...addTrainingData.facilities];
                                                    updated[idx] = e.target.value;
                                                    setAddTrainingData({
                                                        ...addTrainingData,
                                                        facilities: updated,
                                                    });
                                                }}
                                            />
                                            <button
                                                className="px-3 bg-red-500 text-white rounded"
                                                onClick={() => {
                                                    const updated = addTrainingData.facilities.filter(
                                                        (_, i) => i !== idx
                                                    );
                                                    setAddTrainingData({
                                                        ...addTrainingData,
                                                        facilities: updated,
                                                    });
                                                }}
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        className="text-blue-600 text-xs mt-1"
                                        onClick={() =>
                                            setAddTrainingData({
                                                ...addTrainingData,
                                                facilities: [...addTrainingData.facilities, ""],
                                            })
                                        }
                                    >
                                        + Add Facility
                                    </button>
                                </div>

                                {/* Schedule */}
                                <div>
                                    <label className="block mb-1">Implementation Schedule</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="2025-12-01 s/d 2025-12-05"
                                        value={addTrainingData.implementationSchedule}
                                        onChange={(e) =>
                                            setAddTrainingData({
                                                ...addTrainingData,
                                                implementationSchedule: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Competency Test Place */}
                                <div>
                                    <label className="block mb-1">Competency Test Place</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={addTrainingData.competencyTestPlace}
                                        onChange={(e) =>
                                            setAddTrainingData({
                                                ...addTrainingData,
                                                competencyTestPlace: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Certificate */}
                                <div className="md:col-span-2">
                                    <label className="block mb-1">Certificate</label>

                                    {addTrainingData.certificate.map((val, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                className="w-full border rounded px-3 py-2"
                                                value={val}
                                                onChange={(e) => {
                                                    const updated = [...addTrainingData.certificate];
                                                    updated[idx] = e.target.value;
                                                    setAddTrainingData({
                                                        ...addTrainingData,
                                                        certificate: updated,
                                                    });
                                                }}
                                            />
                                            <button
                                                className="px-3 bg-red-500 text-white rounded"
                                                onClick={() => {
                                                    const updated = addTrainingData.certificate.filter(
                                                        (_, i) => i !== idx
                                                    );
                                                    setAddTrainingData({
                                                        ...addTrainingData,
                                                        certificate: updated,
                                                    });
                                                }}
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        className="text-blue-600 text-xs mt-1"
                                        onClick={() =>
                                            setAddTrainingData({
                                                ...addTrainingData,
                                                certificate: [...addTrainingData.certificate, ""],
                                            })
                                        }
                                    >
                                        + Add Certificate
                                    </button>
                                </div>

                                {/* Training Fee */}
                                <div className="md:col-span-2">
                                    <label className="block mb-1">Training Fee</label>
                                    <input
                                        type="number"
                                        className="w-full border rounded px-3 py-2"
                                        value={addTrainingData.trainingFee}
                                        onChange={(e) =>
                                            setAddTrainingData({
                                                ...addTrainingData,
                                                trainingFee: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                                    <Button variant="outline" onClick={() => setShowAddTrainingModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={createTraining}>Save</Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>


                    {/* Detail Training Modal */}
                    <Dialog
                        open={showTrainingModal}
                        onOpenChange={(v) => {
                            setShowTrainingModal(v);
                            if (!v) setIsEditTraining(false);
                        }}
                    >
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Detail Training</DialogTitle>
                            </DialogHeader>

                            {detailTraining && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                                    {/* Training Title */}
                                    <div>
                                        <label className="block mb-1">Training Title</label>
                                        <input
                                            type="text"
                                            disabled={!isEditTraining}
                                            className="w-full border rounded px-3 py-2"
                                            value={trainingForm.trainingTitle}
                                            onChange={(e) =>
                                                setTrainingForm({ ...trainingForm, trainingTitle: e.target.value })
                                            }
                                        />
                                    </div>

                                    {/* Institution Name */}
                                    <div>
                                        <label className="block mb-1">Institution Name</label>
                                        <input
                                            type="text"
                                            disabled={!isEditTraining}
                                            className="w-full border rounded px-3 py-2"
                                            value={trainingForm.institutionName}
                                            onChange={(e) =>
                                                setTrainingForm({ ...trainingForm, institutionName: e.target.value })
                                            }
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="md:col-span-2">
                                        <label className="block mb-1">Description</label>
                                        <textarea
                                            disabled={!isEditTraining}
                                            className="w-full border rounded px-3 py-2 h-24"
                                            value={trainingForm.description}
                                            onChange={(e) =>
                                                setTrainingForm({ ...trainingForm, description: e.target.value })
                                            }
                                        ></textarea>
                                    </div>

                                    {/* Duration */}
                                    <div>
                                        <label className="block mb-1">Duration</label>
                                        <input
                                            type="text"
                                            disabled={!isEditTraining}
                                            className="w-full border rounded px-3 py-2"
                                            value={trainingForm.duration}
                                            onChange={(e) =>
                                                setTrainingForm({ ...trainingForm, duration: e.target.value })
                                            }
                                        />
                                    </div>

                                    {/* Minimum Participants */}
                                    <div>
                                        <label className="block mb-1">Minimum Participants</label>
                                        <input
                                            type="number"
                                            disabled={!isEditTraining}
                                            className="w-full border rounded px-3 py-2"
                                            value={trainingForm.minimumParticipants}
                                            onChange={(e) =>
                                                setTrainingForm({
                                                    ...trainingForm,
                                                    minimumParticipants: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    {/* Implementation Schedule */}
                                    <div>
                                        <label className="block mb-1">Implementation Schedule</label>
                                        <input
                                            type="text"
                                            disabled={!isEditTraining}
                                            className="w-full border rounded px-3 py-2"
                                            value={trainingForm.implementationSchedule}
                                            onChange={(e) =>
                                                setTrainingForm({
                                                    ...trainingForm,
                                                    implementationSchedule: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    {/* Competency Test Place */}
                                    <div>
                                        <label className="block mb-1">Competency Test Place</label>
                                        <input
                                            type="text"
                                            disabled={!isEditTraining}
                                            className="w-full border rounded px-3 py-2"
                                            value={trainingForm.competencyTestPlace}
                                            onChange={(e) =>
                                                setTrainingForm({
                                                    ...trainingForm,
                                                    competencyTestPlace: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    {/* Training Fee */}
                                    <div className="md:col-span-2">
                                        <label className="block mb-1">Training Fee</label>
                                        <input
                                            type="number"
                                            disabled={!isEditTraining}
                                            className="w-full border rounded px-3 py-2"
                                            value={trainingForm.trainingFee}
                                            onChange={(e) =>
                                                setTrainingForm({
                                                    ...trainingForm,
                                                    trainingFee: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    {/* Training Materials */}
                                    <div className="md:col-span-2">
                                        <label className="font-semibold">Training Materials</label>

                                        {trainingForm.trainingMaterials.map((item, idx) => (
                                            <div key={idx} className="flex gap-2 mt-2">
                                                <input
                                                    type="text"
                                                    disabled={!isEditTraining}
                                                    className="flex-1 border rounded px-3 py-2"
                                                    value={item}
                                                    onChange={(e) => {
                                                        const arr = [...trainingForm.trainingMaterials];
                                                        arr[idx] = e.target.value;
                                                        setTrainingForm({ ...trainingForm, trainingMaterials: arr });
                                                    }}
                                                />

                                                {isEditTraining && (
                                                    <button
                                                        onClick={() => {
                                                            const arr = trainingForm.trainingMaterials.filter(
                                                                (_, i) => i !== idx
                                                            );
                                                            setTrainingForm({ ...trainingForm, trainingMaterials: arr });
                                                        }}
                                                        className="text-red-500"
                                                    >
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        {isEditTraining && (
                                            <button
                                                onClick={() =>
                                                    setTrainingForm({
                                                        ...trainingForm,
                                                        trainingMaterials: [...trainingForm.trainingMaterials, ""],
                                                    })
                                                }
                                                className="mt-2 text-blue-600"
                                            >
                                                + Add Material
                                            </button>
                                        )}
                                    </div>

                                    {/* Facilities */}
                                    <div className="md:col-span-2">
                                        <label className="font-semibold">Facilities</label>

                                        {trainingForm.facilities.map((item, idx) => (
                                            <div key={idx} className="flex gap-2 mt-2">
                                                <input
                                                    type="text"
                                                    disabled={!isEditTraining}
                                                    className="flex-1 border rounded px-3 py-2"
                                                    value={item}
                                                    onChange={(e) => {
                                                        const arr = [...trainingForm.facilities];
                                                        arr[idx] = e.target.value;
                                                        setTrainingForm({ ...trainingForm, facilities: arr });
                                                    }}
                                                />

                                                {isEditTraining && (
                                                    <button
                                                        onClick={() => {
                                                            const arr = trainingForm.facilities.filter(
                                                                (_, i) => i !== idx
                                                            );
                                                            setTrainingForm({ ...trainingForm, facilities: arr });
                                                        }}
                                                        className="text-red-500"
                                                    >
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        {isEditTraining && (
                                            <button
                                                onClick={() =>
                                                    setTrainingForm({
                                                        ...trainingForm,
                                                        facilities: [...trainingForm.facilities, ""],
                                                    })
                                                }
                                                className="mt-2 text-blue-600"
                                            >
                                                + Add Facility
                                            </button>
                                        )}
                                    </div>

                                    {/* Certificate */}
                                    <div className="md:col-span-2">
                                        <label className="font-semibold">Certificate</label>

                                        {trainingForm.certificate.map((item, idx) => (
                                            <div key={idx} className="flex gap-2 mt-2">
                                                <input
                                                    type="text"
                                                    disabled={!isEditTraining}
                                                    className="flex-1 border rounded px-3 py-2"
                                                    value={item}
                                                    onChange={(e) => {
                                                        const arr = [...trainingForm.certificate];
                                                        arr[idx] = e.target.value;
                                                        setTrainingForm({ ...trainingForm, certificate: arr });
                                                    }}
                                                />

                                                {isEditTraining && (
                                                    <button
                                                        onClick={() => {
                                                            const arr = trainingForm.certificate.filter(
                                                                (_, i) => i !== idx
                                                            );
                                                            setTrainingForm({ ...trainingForm, certificate: arr });
                                                        }}
                                                        className="text-red-500"
                                                    >
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        {isEditTraining && (
                                            <button
                                                onClick={() =>
                                                    setTrainingForm({
                                                        ...trainingForm,
                                                        certificate: [...trainingForm.certificate, ""],
                                                    })
                                                }
                                                className="mt-2 text-blue-600"
                                            >
                                                + Add Certificate Item
                                            </button>
                                        )}
                                    </div>

                                    {/* ACTION BUTTONS */}
                                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                                        {!isEditTraining && (
                                            <Button onClick={() => setIsEditTraining(true)}>Edit</Button>
                                        )}

                                        {isEditTraining && (
                                            <>
                                                <Button variant="outline" onClick={() => setIsEditTraining(false)}>
                                                    Cancel
                                                </Button>
                                                <Button onClick={updateTraining}>Save</Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>


                    {/* News Tab */}
                    <TabsContent value="news">
                        <Card className="p-6">

                            {/* Header + filter */}
                            <div className="flex items-center justify-between mb-6">

                                <h2 className="text-xl text-gray-900">Manage News</h2>

                                <div className="flex items-center gap-3 ml-auto">
                                    <input
                                        type="text"
                                        placeholder="Filter title..."
                                        value={filterNewsTitle}
                                        onChange={(e) => {
                                            setFilterNewsTitle(e.target.value);
                                            setNewsPage(1);
                                        }}
                                        className="border rounded px-3 py-2 text-sm w-60"
                                    />

                                    <Button onClick={() => setShowAddNewsModal(true)}>
                                        Add News
                                    </Button>
                                </div>

                            </div>

                            {/* TABLE */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Updated</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {newsList.map((n) => (
                                        <TableRow key={n.id}>
                                            <TableCell>{n.title}</TableCell>
                                            <TableCell>{n.description}</TableCell>
                                            <TableCell>{n.author}</TableCell>
                                            <TableCell>{new Date(n.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>{new Date(n.updateAt).toLocaleString()}</TableCell>

                                            <TableCell className="flex gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => getDetailNews(n.id)}>
                                                    <Eye className="w-4 h-4" />
                                                </Button>

                                                <Button variant="ghost" size="sm" onClick={() => deleteNews(n.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>

                            {/* Pagination */}
                            <div className="flex justify-end items-center gap-4 mt-4">

                                <select
                                    value={newsLimit}
                                    onChange={(e) => {
                                        setNewsLimit(Number(e.target.value));
                                        setNewsPage(1);
                                    }}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value={10}>10</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>

                                <Button
                                    onClick={() => setNewsPage((p) => Math.max(1, p - 1))}
                                    disabled={newsPage === 1}
                                    variant="outline"
                                >
                                    Prev
                                </Button>

                                <span className="text-sm text-gray-600">
                                    Page {newsPage} of {newsTotalPages}
                                </span>

                                <Button
                                    onClick={() => setNewsPage((p) => Math.min(newsTotalPages, p + 1))}
                                    disabled={newsPage === newsTotalPages}
                                    variant="outline"
                                >
                                    Next
                                </Button>
                            </div>

                        </Card>
                    </TabsContent>

                    {/* Add News Modal */}
                    <Dialog open={showAddNewsModal} onOpenChange={setShowAddNewsModal}>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add News</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-3 text-sm">

                                <div>
                                    <label className="block mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={addNewsData.title}
                                        onChange={(e) =>
                                            setAddNewsData({ ...addNewsData, title: e.target.value })
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1">Description</label>
                                    <textarea
                                        value={addNewsData.description}
                                        onChange={(e) =>
                                            setAddNewsData({ ...addNewsData, description: e.target.value })
                                        }
                                        className="w-full border rounded px-3 py-2 h-32"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <Button variant="outline" onClick={() => setShowAddNewsModal(false)}>
                                        Batal
                                    </Button>
                                    <Button variant="default" onClick={createNews}>
                                        Simpan
                                    </Button>
                                </div>

                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Detail News Modal */}
                    <Dialog open={showNewsModal} onOpenChange={(v) => {
                        setShowNewsModal(v);
                        if (!v) setIsEditNews(false);
                    }}>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Detail News</DialogTitle>
                            </DialogHeader>

                            {detailNews && (
                                <div className="space-y-3 text-sm">

                                    <div>
                                        <label className="block mb-1">Title</label>
                                        <input
                                            type="text"
                                            disabled={!isEditNews}
                                            value={newsForm.title}
                                            onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1">Description</label>
                                        <textarea
                                            disabled={!isEditNews}
                                            value={newsForm.description}
                                            onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1">Author</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={newsForm.author}
                                            className="w-full bg-gray-100 border rounded px-3 py-2"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 mt-4">
                                        {!isEditNews && (
                                            <Button onClick={() => setIsEditNews(true)}>Edit</Button>
                                        )}

                                        {isEditNews && (
                                            <>
                                                <Button variant="outline" onClick={() => setIsEditNews(false)}>
                                                    Cancel
                                                </Button>
                                                <Button onClick={updateNews}>Save</Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>

                    {/* Jasa Tab */}
                    <TabsContent value="Jasa">
                        <Card className="p-6">

                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl text-gray-900">Manage Jasa</h2>

                                <div className="flex items-center gap-3 ml-auto">
                                    <input
                                        type="text"
                                        placeholder="Filter title..."
                                        value={filterProductTitle}
                                        onChange={(e) => { setFilterProductTitle(e.target.value); setProductPage(1); }}
                                        className="border rounded px-3 py-2 text-sm w-60"
                                    />

                                    <Button onClick={() => setShowAddProductModal(true)}>
                                        Add Jasa
                                    </Button>
                                </div>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Updated</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {productList.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell>{p.title}</TableCell>
                                            <TableCell>{p.category}</TableCell>
                                            <TableCell>{p.description}</TableCell>
                                            <TableCell>{p.author}</TableCell>
                                            <TableCell>{new Date(p.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>{new Date(p.updateAt).toLocaleString()}</TableCell>

                                            <TableCell className="flex gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => getDetailProduct(p.id)}>
                                                    <Eye className="w-4 h-4" />
                                                </Button>

                                                <Button variant="ghost" size="sm" onClick={() => deleteProduct(p.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="flex justify-end items-center gap-4 mt-4">
                                <select
                                    value={productLimit}
                                    onChange={(e) => { setProductLimit(Number(e.target.value)); setProductPage(1); }}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value={10}>10</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>

                                <Button
                                    onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                                    disabled={productPage === 1}
                                    variant="outline"
                                >
                                    Prev
                                </Button>

                                <span className="text-sm text-gray-600">
                                    Page {productPage} of {productTotalPages}
                                </span>

                                <Button
                                    onClick={() => setProductPage((p) => Math.min(productTotalPages, p + 1))}
                                    disabled={productPage === productTotalPages}
                                    variant="outline"
                                >
                                    Next
                                </Button>
                            </div>

                        </Card>
                    </TabsContent>

                    {/* Add Jasa Modal */}
                    <Dialog open={showAddProductModal} onOpenChange={setShowAddProductModal}>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add Jasa</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-3 text-sm">

                                <div>
                                    <label className="block mb-1">Title</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={addProductData.title}
                                        onChange={(e) => setAddProductData({ ...addProductData, title: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1">Category</label>
                                    <input
                                        type="text"
                                        className="w-full border bg-gray-100 rounded px-3 py-2"
                                        value={addProductData.category}
                                        onChange={(e) => setAddProductData({ ...addProductData, category: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1">Description</label>
                                    <textarea
                                        className="w-full border rounded px-3 py-2 h-32"
                                        value={addProductData.description}
                                        onChange={(e) => setAddProductData({ ...addProductData, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <Button variant="outline" onClick={() => setShowAddProductModal(false)}>Batal</Button>
                                    <Button onClick={createProduct}>Simpan</Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Detail Jasa Modal */}
                    <Dialog open={showProductModal} onOpenChange={(v) => {
                        setShowProductModal(v);
                        if (!v) setIsEditProduct(false);
                    }}>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Detail Jasa</DialogTitle>
                            </DialogHeader>

                            {detailProduct && (
                                <div className="space-y-3 text-sm">

                                    <div>
                                        <label className="block mb-1">Title</label>
                                        <input
                                            type="text"
                                            disabled={!isEditProduct}
                                            className="w-full border rounded px-3 py-2"
                                            value={productForm.title}
                                            onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1">Category</label>
                                        <input
                                            type="text"
                                            disabled={!isEditProduct}
                                            className="w-full border rounded px-3 py-2"
                                            value={productForm.category}
                                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1">Description</label>
                                        <textarea
                                            disabled={!isEditProduct}
                                            className="w-full border rounded px-3 py-2"
                                            value={productForm.description}
                                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block mb-1">Author</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={productForm.author}
                                            className="w-full bg-gray-100 border rounded px-3 py-2"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 mt-4">
                                        {!isEditProduct && (
                                            <Button onClick={() => setIsEditProduct(true)}>Edit</Button>
                                        )}

                                        {isEditProduct && (
                                            <>
                                                <Button variant="outline" onClick={() => setIsEditProduct(false)}>Cancel</Button>
                                                <Button onClick={updateProduct}>Save</Button>
                                            </>
                                        )}
                                    </div>

                                </div>
                            )}
                        </DialogContent>
                    </Dialog>


                </Tabs>
            </div>
        </div>
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
// function CreateNewsDialog({ onSuccess, accessToken }: { onSuccess: () => void; accessToken: string | null }) {
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         title: '',
//         content: '',
//     });

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(
//                 `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/news`,
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                     body: JSON.stringify(formData),
//                 }
//             );
//             if (response.ok) {
//                 setOpen(false);
//                 setFormData({ title: '', content: '' });
//                 onSuccess();
//             }
//         } catch (error) {
//             console.error('Failed to create news:', error);
//         }
//     };

// return (
//     <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//             <Button className="gap-2">
//                 <Plus className="w-4 h-4" />
//                 Add News
//             </Button>
//         </DialogTrigger>
//         <DialogContent>
//             <DialogHeader>
//                 <DialogTitle>Create News Article</DialogTitle>
//                 <DialogDescription>Add a new news article to the platform</DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <Label>Title</Label>
//                     <Input
//                         value={formData.title}
//                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <Label>Content</Label>
//                     <textarea
//                         className="w-full min-h-[150px] px-3 py-2 border rounded-md"
//                         value={formData.content}
//                         onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                         required
//                     />
//                 </div>
//                 <Button type="submit" className="w-full">Create News</Button>
//             </form>
//         </DialogContent>
//     </Dialog>
// );
// }
