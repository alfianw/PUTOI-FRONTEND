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
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import DeleteConfirmModal from '../components/ui/DeleteConfirmModal';


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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTitle, setDeleteTitle] = useState("");
    const [onConfirmDelete, setOnConfirmDelete] = useState<() => void>(() => { });

    const openDeleteModal = (title: string, onConfirm: () => void) => {
        setDeleteTitle(title);
        setOnConfirmDelete(() => onConfirm);
        setShowDeleteModal(true);
    };
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
    const [showNewsModal, setShowNewsModal] = useState(false);
    const [isEditNews, setIsEditNews] = useState(false);
    const [filterNewsTitle, setFilterNewsTitle] = useState("");
    const [showAddNewsModal, setShowAddNewsModal] = useState(false);
    const [detailNews, setDetailNews] = useState<NewsItem | null>(null);
    const [addNewsData, setAddNewsData] = useState({
        title: "",
        description: "",
    });
    const [newsForm, setNewsForm] = useState<NewsItem>({
        id: 0,
        title: "",
        description: "",
        author: "",
        createdAt: "",
        updateAt: "",
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
    const [showProductModal, setShowProductModal] = useState(false);
    const [isEditProduct, setIsEditProduct] = useState(false);
    interface ProductItem {
        id: number;
        title: string;
        description: string;
        category: string;
        author: string;
        createdAt: string;
        updateAt: string;
    }
    const [detailProduct, setDetailProduct] = useState<ProductItem | null>(null);
    const [productForm, setProductForm] = useState<ProductItem>({
        id: 0,
        title: "",
        description: "",
        category: "",
        author: "",
        createdAt: "",
        updateAt: "",
    });

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
        startDate: string;
        endDate: string;
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
        startDate: "",
        endDate: "",
    });

    // TRAINING PARTICIPANT
    interface TrainingParticipant {
        id: number;
        name: string;
        participantType: string;
        identityNumber: string;
        gender: string;
        universityName: string;
        email: string;
        phoneNumber: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        training: string;
    }

    const [tpList, setTpList] = useState<TrainingParticipant[]>([]);
    const [tpPage, setTpPage] = useState(1);
    const [tpLimit, setTpLimit] = useState(10);
    const [tpTotalPages, setTpTotalPages] = useState(1);
    const [tpTotalData, setTpTotalData] = useState(0);
    const [filterTPName, setFilterTPName] = useState("");

    const [detailTP, setDetailTP] = useState(null);
    const [tpForm, setTpForm] = useState<any>({});
    const [showTPModal, setShowTPModal] = useState(false);
    const [isEditTP, setIsEditTP] = useState(false);

    const [toast, setToast] = useState<{ type: string; message: string } | null>(null);

    // fungsi helper untuk menampilkan toast
    const showToast = (type: "success" | "error", message: string) => {
        setToast({ type, message });

        setTimeout(() => {
            setToast(null);
        }, 3000); // hilang 3 detik
    };

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (user?.role === 'superadmin') {
            fetchAllData();
        }
    }, [user]);

    const fetchAllData = async () => {
        await Promise.all([fetchUsers(), fetchTraining(), fetchNews()]);
    };

    //user state
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
                showToast("success", "User berhasil dihapus");
            } else {
                showToast("error", data.message || "Gagal menghapus user");
            }
        } catch (error) {
            showToast("error", "Terjadi kesalahan sistem");
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
                showToast("success", "User berhasil diperbarui"); // ✅ notifikasi success
            } else {
                showToast("error", data.message || "Gagal memperbarui user"); // ✅ notifikasi error
            }
        } catch (error) {
            showToast("error", "Terjadi kesalahan sistem"); // ✅ notifikasi error
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

            const res = await fetch(`${API_BASE}/api/news/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newsForm)
            });

            const data = await res.json();

            if (data.code === "00") {
                setDetailNews(data.data);
                setIsEditNews(false);
                await fetchNews();
                showToast("success", "Berita berhasil diperbarui");
            } else {
                showToast("error", data.message || "Gagal memperbarui berita");
            }

        } catch (err) {
            console.error("Update news error:", err);
            showToast("error", "Terjadi kesalahan server!");
        }
    };

    const deleteNews = async (id: number) => {
        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`${API_BASE}/api/news/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id: String(id) })
            });

            const data = await res.json();

            if (data.code === "00") {
                await fetchNews();
                showToast("success", "Berita berhasil dihapus");
            } else {
                showToast("error", data.message || "Gagal menghapus berita");
            }

        } catch (err) {
            console.error("Delete news error:", err);
            showToast("error", "Terjadi kesalahan server!");
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
                body: JSON.stringify({
                    title: addNewsData.title,
                    description: addNewsData.description
                })
            });

            const data = await res.json();

            if (data.code === "00") {
                setShowAddNewsModal(false);
                setAddNewsData({ title: "", description: "" });
                await fetchNews();
                showToast("success", "Berita berhasil dibuat");
            } else {
                showToast("error", data.message || "Gagal membuat berita");
            }

        } catch (err) {
            console.error("Create news error:", err);
            showToast("error", "Terjadi kesalahan server!");
        }
    };

    useEffect(() => {
        fetchNews();
    }, [newsPage, newsLimit, filterNewsTitle]);

    useEffect(() => {
        if (showAddNewsModal) {
            setAddNewsData({ title: "", description: "" });

            // Reset editor content jika sudah ada
            if (editor) {
                editor.commands.setContent("");
            }
        }
    }, [showAddNewsModal]);

    const [isEditorFocused, setIsEditorFocused] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            BulletList,
            OrderedList,
            ListItem
        ],
        content: addNewsData.description,
        onUpdate: ({ editor }) => {
            setAddNewsData(prev => ({
                ...prev,
                description: editor.getHTML()
            }));
        }
    });

    const [detailEditor, setDetailEditor] = useState<any>(null);

    const editorDetail = useEditor({
        extensions: [StarterKit],
        editable: isEditNews,
        onUpdate: ({ editor }) => {
            setNewsForm(prev => ({
                ...prev,
                description: editor.getHTML(),
            }));
        },
    });

    useEffect(() => {
        if (editorDetail) {
            editorDetail.setEditable(isEditNews);
        }
    }, [isEditNews, editorDetail]);

    useEffect(() => {
        if (editorDetail && detailNews) {
            // Set content hanya sekali saat modal dibuka
            editorDetail.commands.setContent(detailNews.description || "");
        }
    }, [editorDetail, detailNews])

    useEffect(() => {
        setDetailEditor(editorDetail);
    }, [editorDetail]);


    if (!editorDetail && isEditNews) return <p>Loading editor...</p>;

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
                await fetchProducts();
                showToast("success", "Produk berhasil dibuat");
            } else {
                showToast("error", data.message || "Gagal membuat produk");
            }

        } catch (err) {
            console.error("Create product error:", err);
            showToast("error", "Terjadi kesalahan server!");
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
                await fetchProducts();
                showToast("success", "Produk berhasil diperbarui");
            } else {
                showToast("error", data.message || "Gagal memperbarui produk");
            }

        } catch (err) {
            console.error("Update product error:", err);
            showToast("error", "Terjadi kesalahan server!");
        }
    };

    const deleteProduct = async (id: number) => {
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
            if (data.code === "00") {
                await fetchProducts();
                showToast("success", "Produk berhasil dihapus");
            } else {
                showToast("error", data.message || "Gagal menghapus produk");
            }

        } catch (err) {
            console.error("Delete product error:", err);
            showToast("error", "Terjadi kesalahan server!");
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

    const parseSchedule = (schedule: string) => {
        if (!schedule) return { start: "", end: "" };

        const parts = schedule.split(" s/d ");

        return {
            start: parts[0] || "",
            end: parts[1] || ""
        };
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
                const d = data.data;

                const { start, end } = parseSchedule(d.implementationSchedule);

                setDetailTraining(d);

                setTrainingForm({
                    ...d,
                    startDate: start,
                    endDate: end
                });

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
                showToast("error", "Competency Test Place wajib diisi");
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
                await fetchTraining();
                showToast("success", "Training berhasil dibuat");

                // RESET FORM
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
                    trainingFee: "",
                    startDate: "",
                    endDate: "",
                });
            } else {
                showToast("error", data.message || "Gagal membuat training");
            }

        } catch (err) {
            console.error("Create training error:", err);
            showToast("error", "Terjadi kesalahan server!");
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
                await fetchTraining();
                showToast("success", "Training berhasil diperbarui");
            } else {
                showToast("error", data.message || "Gagal memperbarui training");
            }

        } catch (err) {
            console.error("Update training error:", err);
            showToast("error", "Terjadi kesalahan server!");
        }
    };

    const deleteTraining = async (id: number) => {
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
                await fetchTraining();
                showToast("success", "Training berhasil dihapus");
            } else {
                showToast("error", data.message || "Gagal menghapus training");
            }

        } catch (err) {
            console.error("Delete training error:", err);
            showToast("error", "Terjadi kesalahan server!");
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

    // Fetch Training Participants
    const fetchTrainingParticipants = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`${API_BASE}/api/training-participants/pagination`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    sortBy: "id",
                    sortOrder: "desc",
                    limit: String(tpLimit),
                    page: String(tpPage),
                    filters: {
                        name: filterTPName,
                        email: "",
                    }
                })
            });

            const data = await res.json();

            if (data.code === "00") {
                setTpList(data.data || []);
                setTpTotalPages(data.totalPages || 1);
                setTpTotalData(data.countData || 0);
            }

        } catch (e) {
            console.error("Error fetch training participants:", e);
        }
    };

    // GET DETAIL
    const getDetailTP = async (id: number) => {
        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`${API_BASE}/api/training-participants/detail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ id: String(id) })
            });

            const data = await res.json();

            if (data.code === "00") {
                setDetailTP(data.data);
                setTpForm(data.data);
                setShowTPModal(true);
            }

        } catch (e) {
            console.error("Detail TP error:", e);
        }
    };

    const updateTP = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`${API_BASE}/api/training-participants/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(tpForm)
            });

            const data = await res.json();

            if (data.code === "00") {
                setDetailTP(data.data);
                setIsEditTP(false);
                await fetchTrainingParticipants();
                showToast("success", "Participant berhasil diperbarui");
            } else {
                showToast("error", data.message || "Gagal memperbarui participant");
            }

        } catch (err) {
            console.error("Update TP error:", err);
            showToast("error", "Terjadi kesalahan server!");
        }
    };

    const deleteTP = async (id: number) => {
        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`${API_BASE}/api/training-participants/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ id: String(id) })
            });

            const data = await res.json();

            if (data.code === "00") {
                await fetchTrainingParticipants();
                showToast("success", "Participant berhasil dihapus");
            } else {
                showToast("error", data.message || "Gagal menghapus participant");
            }

        } catch (err) {
            console.error("Delete TP error:", err);
            showToast("error", "Terjadi kesalahan server!");
        }
    };

    useEffect(() => {
        fetchTrainingParticipants();
    }, [tpPage, tpLimit, filterTPName]);

    const stripHtml = (html: string) => {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
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

            {toast && (
                <div
                    className={`fixed top-5 right-5 min-w-[250px] px-4 py-3 rounded-lg shadow-lg border flex items-center gap-3 transition-all bg-white`}
                    style={{ zIndex: 9999 }}
                >
                    {toast.type === "success" ? (
                        <span className="text-green-600 text-xl">✔️</span>
                    ) : (
                        <span className="text-red-600 text-xl">❌</span>
                    )}

                    <span className="text-gray-800 font-medium">{toast.message}</span>
                </div>
            )}

            <DeleteConfirmModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={onConfirmDelete}
                title={deleteTitle}
            />

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
                    <p className="text-gray-600 mt-2">Kelola semua fitur PUTOI-TIK</p>
                </div>

                {/* Stats Cards */}
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Pengguna</p>
                                <p className="text-3xl text-gray-900 mt-2">{totalUsers}</p>
                            </div>
                            <Users className="w-12 h-12 text-purple-600" />
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Pelatihan</p>
                                <p className="text-3xl text-gray-900 mt-2">{trainingTotalData}</p>
                            </div>
                            <BookOpen className="w-12 h-12 text-blue-600" />
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Berita</p>
                                <p className="text-3xl text-gray-900 mt-2">{newsTotalData}</p>
                            </div>
                            <Newspaper className="w-12 h-12 text-green-600" />
                        </div>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="users" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="users">Pengguna</TabsTrigger>
                        <TabsTrigger value="courses">Pelatihan</TabsTrigger>
                        <TabsTrigger value="news">Berita</TabsTrigger>
                        <TabsTrigger value="Jasa">Jasa</TabsTrigger>
                        <TabsTrigger value="trainingParticipant">Peserta Pelatihan</TabsTrigger>
                    </TabsList>

                    {/* Users Tab */}
                    <TabsContent value="users">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl text-gray-900">Kelola Pengguna</h2>
                                {/* Filter Nama */}
                                <input
                                    type="text"
                                    placeholder="Filter berdasarkan nama..."
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
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>No. Telepon</TableHead>
                                        <TableHead>Peran</TableHead>
                                        {/* <TableHead>Peserta</TableHead> */}
                                        {/* <TableHead>No. Identitas</TableHead> */}
                                        <TableHead>Jenis Kelamin</TableHead>
                                        {/* <TableHead>Universitas</TableHead> */}
                                        {/* <TableHead>Bidang Pendidikan</TableHead> */}
                                        {/* <TableHead>Jurusan</TableHead> */}
                                        {/* <TableHead>Kota</TableHead> */}
                                        <TableHead>Dibuat Pada</TableHead>
                                        <TableHead>Diperbarui Pada</TableHead>
                                        <TableHead>Aksi</TableHead>
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

                                            {/* <TableCell>{u.participantType}</TableCell> */}
                                            {/* <TableCell>{u.identityNumber}</TableCell> */}
                                            <TableCell>{u.gender}</TableCell>
                                            {/* <TableCell>{u.universityName}</TableCell> */}
                                            {/* <TableCell>{u.lastEducationField}</TableCell> */}
                                            {/* <TableCell>{u.majorStudyProgram}</TableCell> */}
                                            {/* <TableCell>{u.cityOfResidence}</TableCell> */}
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
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        openDeleteModal("Apakah Anda yakin ingin menghapus user ini?", async () => {
                                                            await deleteUser(u.email); // panggil fungsi delete sesuai jenis data
                                                            setShowDeleteModal(false);
                                                        })
                                                    }
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
                                    Sebelumnya
                                </Button>

                                {/* Page Indicator */}
                                <span className="text-sm text-gray-600">
                                    Halaman {userPage} dari {userTotalPages}
                                </span>

                                {/* Next Button */}
                                <Button
                                    onClick={() => setUserPage((p) => Math.min(userTotalPages, p + 1))}
                                    disabled={userPage === userTotalPages}
                                    variant="outline"
                                >
                                    Selanjutnya
                                </Button>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* === DETAIL USER DENGAN 2 KOLOM === */}
                    <Dialog open={showDetailModal} onOpenChange={(v) => {
                        setShowDetailModal(v);
                        if (!v) setIsEdit(false);
                    }}>
                        <DialogContent className="max-w" style={{ maxHeight: "600px", overflowY: "auto" }}>
                            <DialogHeader>
                                <DialogTitle>Detail Pengguna</DialogTitle>
                            </DialogHeader>

                            {detailUser && (
                                <div className="space-y-4 text-sm">

                                    {/* ==== 2 KOLOM ==== */}
                                    <div className="flex gap-4">

                                        {/* KOLOM KIRI */}
                                        <div className="flex-1 space-y-3">

                                            {/* Nama */}
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

                                            {/* No HP */}
                                            <div>
                                                <label className="block mb-1">No. HP</label>
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

                                        </div>

                                        {/* KOLOM KANAN */}
                                        <div className="flex-1 space-y-3">

                                            {/* Email */}
                                            <div>
                                                <label className="block mb-1">Email</label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={formData.email}
                                                    className="w-full border bg-gray-100 rounded px-3 py-2"
                                                />
                                            </div>

                                            {/* Tipe Peserta */}
                                            <div>
                                                <label className="block mb-1">Tipe Peserta</label>
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

                                        </div>
                                    </div>

                                    {/* ==== SISANYA TURUN KE BAWAH ==== */}

                                    {/* Gender */}
                                    <div>
                                        <label className="block mb-1">Jenis Kelamin</label>
                                        <select
                                            disabled={!isEdit}
                                            value={formData.gender || ""}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                        >
                                            <option value="Laki-laki">Laki-laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </div>

                                    {/* No Identitas */}
                                    <div>
                                        <label className="block mb-1">No. Identitas</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.identityNumber || ""}
                                            onChange={(e) => setFormData({ ...formData, identityNumber: e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* Universitas */}
                                    <div>
                                        <label className="block mb-1">Universitas</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.universityName || ""}
                                            onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* Bidang Pendidikan */}
                                    <div>
                                        <label className="block mb-1">Bidang Pendidikan</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.lastEducationField || ""}
                                            onChange={(e) => setFormData({ ...formData, lastEducationField: e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* Program Studi */}
                                    <div>
                                        <label className="block mb-1">Program Studi</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.majorStudyProgram || ""}
                                            onChange={(e) => setFormData({ ...formData, majorStudyProgram: e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* Kota */}
                                    <div>
                                        <label className="block mb-1">Kota Domisili</label>
                                        <input
                                            type="text"
                                            disabled={!isEdit}
                                            value={formData.cityOfResidence || ""}
                                            onChange={(e) => setFormData({ ...formData, cityOfResidence: e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* Aksi */}
                                    <div className="flex justify-end gap-3 mt-4">
                                        {!isEdit && (
                                            <Button onClick={() => setIsEdit(true)} variant="default">
                                                Edit Pengguna
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
                                <h2 className="text-xl text-gray-900">Kelola Pelatihan</h2>

                                <div className="flex items-center gap-3 ml-auto">
                                    <input
                                        type="text"
                                        placeholder="Filter berdasarkan judul..."
                                        value={filterTrainingTitle}
                                        onChange={(e) => {
                                            setFilterTrainingTitle(e.target.value);
                                            setTrainingPage(1);
                                        }}
                                        className="border rounded px-3 py-2 text-sm w-60"
                                    />

                                    <Button onClick={() => setShowAddTrainingModal(true)}>
                                        Tambah Pelatihan
                                    </Button>
                                </div>
                            </div>

                            {/* TABLE */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {/* <TableHead>ID</TableHead> */}
                                        <TableHead>Judul</TableHead>
                                        {/* <TableHead>Deskripsi</TableHead> */}
                                        <TableHead>Materi</TableHead>
                                        {/* <TableHead>Institusi</TableHead> */}
                                        {/* <TableHead>Durasi</TableHead> */}
                                        {/* <TableHead>Minimal Peserta</TableHead> */}
                                        {/* <TableHead>Fasilitas</TableHead> */}
                                        <TableHead>Jadwal</TableHead>
                                        {/* <TableHead>Lokasi Uji Kompetensi</TableHead> */}
                                        {/* <TableHead>Sertifikat</TableHead> */}
                                        {/* <TableHead>Biaya Pelatihan</TableHead> */}
                                        {/* <TableHead>Pembuat</TableHead> */}
                                        <TableHead>Dibuat Pada</TableHead>
                                        <TableHead>Diperbarui Pada</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {trainingList.map((t) => (
                                        <TableRow key={t.id}>
                                            {/* <TableCell>{t.id}</TableCell> */}

                                            <TableCell>{t.trainingTitle}</TableCell>

                                            {/* <TableCell>{t.description}</TableCell> */}

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

                                            {/* <TableCell>{t.institutionName}</TableCell> */}

                                            {/* <TableCell>{t.duration}</TableCell> */}

                                            {/* <TableCell>{t.minimumParticipants}</TableCell> */}

                                            {/* <TableCell>
                                                {Array.isArray(t.facilities) && t.facilities.length > 0 ? (
                                                    <ul className="list-disc pl-4">
                                                        {t.facilities.map((f, i) => (
                                                            <li key={i}>{f}</li>
                                                        ))}
                                                    </ul>
                                                ) : "-"}
                                            </TableCell> */}

                                            <TableCell>{t.implementationSchedule}</TableCell>

                                            {/* <TableCell>{t.competencyTestPlace}</TableCell> */}

                                            {/* <TableCell>
                                                {Array.isArray(t.certificate) && t.certificate.length > 0 ? (
                                                    <ul className="list-disc pl-4">
                                                        {t.certificate.map((c, i) => (
                                                            <li key={i}>{c}</li>
                                                        ))}
                                                    </ul>
                                                ) : "-"}
                                            </TableCell> */}

                                            {/* <TableCell>{Number(t.trainingFee).toLocaleString("id-ID")}</TableCell> */}

                                            {/* <TableCell>{t.author}</TableCell> */}

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
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        openDeleteModal("Apakah Anda yakin ingin menghapus training ini?", async () => {
                                                            await deleteTraining(t.id);
                                                            setShowDeleteModal(false);
                                                        })
                                                    }
                                                >
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
                                    Sebelumnya
                                </Button>

                                <span className="text-sm text-gray-600">
                                    Halaman {trainingPage} dari {trainingTotalPages}
                                </span>

                                <Button
                                    onClick={() => setTrainingPage((p) => Math.min(trainingTotalPages, p + 1))}
                                    disabled={trainingPage === trainingTotalPages}
                                    variant="outline"
                                >
                                    Selanjutnya
                                </Button>
                            </div>

                        </Card>
                    </TabsContent>

                    {/* CREATE TRAINING MODAL */}
                    <Dialog open={showAddTrainingModal} onOpenChange={setShowAddTrainingModal}>
                        <DialogContent className="max-w-3xl" style={{ maxHeight: "600px", overflowY: "auto" }}>
                            <DialogHeader>
                                <DialogTitle>Buat Pelatihan</DialogTitle>
                            </DialogHeader>

                            {/* FORM 2 COLUMN */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                                {/* Training Title */}
                                <div>
                                    <label className="block mb-1">Judul Pelatihan</label>
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
                                    <label className="block mb-1">Nama Institusi</label>
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
                                    <label className="block mb-1">Deskripsi</label>
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
                                    <label className="block mb-1">Materi Pelatihan</label>

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
                                        + Tambah Materi
                                    </button>
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block mb-1">Durasi</label>
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
                                    <label className="block mb-1">Minimal Peserta</label>
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
                                    <label className="block mb-1">Fasilitas</label>

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
                                        + Tambah Fasilitas
                                    </button>
                                </div>

                                {/* Schedule */}
                                <div>
                                    <label className="block mb-1 font-medium">Jadwal Pelaksanaan</label>

                                    {/* Label Mulai */}
                                    <span className="text-xs text-gray-600">Tanggal Mulai</span>
                                    <input
                                        type="date"
                                        className="w-full border rounded px-3 py-2 mb-3"
                                        value={addTrainingData.startDate || ""}
                                        onChange={(e) => {
                                            const start = e.target.value;
                                            const end = addTrainingData.endDate || "";

                                            // Validasi jika end sudah diisi
                                            if (end && new Date(end) < new Date(start)) {
                                                alert("Tanggal selesai tidak boleh sebelum tanggal mulai!");
                                                return;
                                            }

                                            setAddTrainingData({
                                                ...addTrainingData,
                                                startDate: start,
                                                implementationSchedule: end
                                                    ? `${start} s/d ${end}`
                                                    : start,
                                            });
                                        }}
                                    />

                                    {/* Label Selesai */}
                                    <span className="text-xs text-gray-600">Tanggal Selesai</span>
                                    <input
                                        type="date"
                                        className="w-full border rounded px-3 py-2"
                                        value={addTrainingData.endDate || ""}
                                        onChange={(e) => {
                                            const end = e.target.value;
                                            const start = addTrainingData.startDate || "";

                                            // Validasi tanggal selesai < tanggal mulai
                                            if (start && new Date(end) < new Date(start)) {
                                                alert("Tanggal selesai tidak boleh sebelum tanggal mulai!");
                                                return;
                                            }

                                            setAddTrainingData({
                                                ...addTrainingData,
                                                endDate: end,
                                                implementationSchedule: start
                                                    ? `${start} s/d ${end}`
                                                    : end,
                                            });
                                        }}
                                    />
                                </div>


                                {/* Competency Test Place */}
                                <div>
                                    <label className="block mb-1">Tempat Uji Kompetensi</label>
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
                                    <label className="block mb-1">Sertifikat</label>

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
                                        + Tambah Sertifikat
                                    </button>
                                </div>

                                {/* Training Fee */}
                                <div className="md:col-span-2">
                                    <label className="block mb-1">Biaya Pelatihan</label>
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
                                        Batal
                                    </Button>
                                    <Button onClick={createTraining}>Simpan</Button>
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
                        <DialogContent className="max-w-3xl" style={{ maxHeight: "600px", overflowY: "auto" }}>
                            <DialogHeader>
                                <DialogTitle>Detail Pelatihan</DialogTitle>
                            </DialogHeader>

                            {detailTraining && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                                    {/* Training Title */}
                                    <div>
                                        <label className="block mb-1">Judul Pelatihan</label>
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
                                        <label className="block mb-1">Nama Institusi</label>
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
                                        <label className="block mb-1">Deskripsi</label>
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
                                        <label className="block mb-1">Durasi</label>
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
                                        <label className="block mb-1">Jumlah Peserta Minimum</label>
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
                                        <label className="block mb-1">Jadwal Pelaksanaan</label>

                                        {/* Tanggal Mulai */}
                                        <label className="text-sm text-gray-600">Tanggal Mulai</label>
                                        <input
                                            type="date"
                                            disabled={!isEditTraining}
                                            className="w-full border rounded px-3 py-2 mb-2"
                                            value={trainingForm.startDate || ""}
                                            onChange={(e) => {
                                                const start = e.target.value;
                                                const end = trainingForm.endDate || "";

                                                setTrainingForm({
                                                    ...trainingForm,
                                                    startDate: start,
                                                    implementationSchedule: end ? `${start} s/d ${end}` : start,
                                                });
                                            }}
                                        />

                                        {/* Tanggal Selesai */}
                                        <label className="text-sm text-gray-600">Tanggal Selesai</label>
                                        <input
                                            type="date"
                                            disabled={!isEditTraining}
                                            className="w-full border rounded px-3 py-2"
                                            value={trainingForm.endDate || ""}
                                            onChange={(e) => {
                                                const end = e.target.value;
                                                const start = trainingForm.startDate || "";

                                                if (start && end < start) {
                                                    alert("Tanggal selesai tidak boleh lebih kecil dari tanggal mulai");
                                                    return;
                                                }

                                                setTrainingForm({
                                                    ...trainingForm,
                                                    endDate: end,
                                                    implementationSchedule: start ? `${start} s/d ${end}` : end,
                                                });
                                            }}
                                        />
                                    </div>

                                    {/* Competency Test Place */}
                                    <div>
                                        <label className="block mb-1">Lokasi Uji Kompetensi</label>
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
                                        <label className="block mb-1">Biaya Pelatihan</label>
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
                                        <label className="font-semibold">Materi Pelatihan</label>

                                        {trainingForm.trainingMaterials.map((item: string, idx: number) => (
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
                                                                (_: string, i: number) => i !== idx
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
                                                + Tambah Materi
                                            </button>
                                        )}
                                    </div>

                                    {/* Facilities */}
                                    <div className="md:col-span-2">
                                        <label className="font-semibold">Fasilitas</label>

                                        {trainingForm.facilities.map((item: string, idx: number) => (
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
                                                                (_: string, i: number) => i !== idx
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
                                                + Tambah Fasilitas
                                            </button>
                                        )}
                                    </div>

                                    {/* Certificate */}
                                    <div className="md:col-span-2">
                                        <label className="font-semibold">Sertifikat</label>

                                        {trainingForm.certificate.map((item: string, idx: number) => (
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
                                                                (_: string, i: number) => i !== idx
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
                                                + Tambah Item Sertifikat
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
                                                    Batal
                                                </Button>
                                                <Button onClick={updateTraining}>Simpan</Button>
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

                                <h2 className="text-xl text-gray-900">Kelola Berita</h2>

                                <div className="flex items-center gap-3 ml-auto">
                                    <input
                                        type="text"
                                        placeholder="Filter berdasarkan judul..."
                                        value={filterNewsTitle}
                                        onChange={(e) => {
                                            setFilterNewsTitle(e.target.value);
                                            setNewsPage(1);
                                        }}
                                        className="border rounded px-3 py-2 text-sm w-60"
                                    />

                                    <Button onClick={() => setShowAddNewsModal(true)}>
                                        Tambah Berita
                                    </Button>
                                </div>

                            </div>

                            {/* TABLE */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Judul</TableHead>
                                        {/* <TableHead>Deskripsi</TableHead> */}
                                        <TableHead>Penulis</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                        <TableHead>Diperbarui</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {newsList.map((n) => (
                                        <TableRow key={n.id}>
                                            <TableCell>{n.title}</TableCell>

                                            {/* <TableCell
                                                className=" max-w-[220px] whitespace-normal break-words line-clamp-2 overflow-hidden text-ellipsis"
                                            >
                                                {n.description.replace(/<[^>]+>/g, "")}
                                            </TableCell> */}

                                            <TableCell>{n.author}</TableCell>
                                            <TableCell>{new Date(n.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>{new Date(n.updateAt).toLocaleString()}</TableCell>

                                            <TableCell className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => getDetailNews(n.id)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        openDeleteModal("Apakah Anda yakin ingin menghapus berita ini?", async () => {
                                                            await deleteNews(n.id);
                                                            setShowDeleteModal(false);
                                                        })
                                                    }
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
                                    Sebelumnya
                                </Button>

                                <span className="text-sm text-gray-600">
                                    Halaman {newsPage} dari {newsTotalPages}
                                </span>

                                <Button
                                    onClick={() => setNewsPage((p) => Math.min(newsTotalPages, p + 1))}
                                    disabled={newsPage === newsTotalPages}
                                    variant="outline"
                                >
                                    Selanjutnya
                                </Button>
                            </div>

                        </Card>
                    </TabsContent>

                    {/* Add News Modal */}
                    <Dialog open={showAddNewsModal} onOpenChange={setShowAddNewsModal}>
                        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" style={{ maxHeight: "600px", overflowY: "auto" }}>
                            <DialogHeader>
                                <DialogTitle>Tambah Berita</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-3 text-sm">

                                {/* Title */}
                                <div>
                                    <label className="block mb-1">Judul</label>
                                    <input
                                        type="text"
                                        value={addNewsData.title}
                                        onChange={(e) =>
                                            setAddNewsData({ ...addNewsData, title: e.target.value })
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>

                                {/* Description WYSIWYG */}
                                <div className="mb-4">
                                    <label className="block mb-1">Deskripsi</label>

                                    <RichTextEditor
                                        editor={editor}
                                        className={`rounded-md p-2 space-y-2 transition-all duration-150
            ${isEditorFocused ? "border-2 border-blue-500 shadow-md" : "border"}
        `}
                                    >
                                        {/* Toolbar */}
                                        <RichTextEditor.Toolbar
                                            className={`
                transition-all rounded-md p-1
                ${isEditorFocused ? "ring-2 ring-blue-500 bg-blue-50" : "bg-gray-50"}
            `}
                                        >
                                            <RichTextEditor.ControlsGroup>
                                                <RichTextEditor.Bold active={editor?.isActive("bold")} />
                                                <RichTextEditor.Italic active={editor?.isActive("italic")} />
                                                <RichTextEditor.Underline active={editor?.isActive("underline")} />
                                                <RichTextEditor.Strikethrough active={editor?.isActive("strike")} />
                                            </RichTextEditor.ControlsGroup>

                                            <RichTextEditor.ControlsGroup>
                                                <RichTextEditor.H1 active={editor?.isActive("heading", { level: 1 })} />
                                                <RichTextEditor.H2 active={editor?.isActive("heading", { level: 2 })} />
                                                <RichTextEditor.H3 active={editor?.isActive("heading", { level: 3 })} />
                                            </RichTextEditor.ControlsGroup>

                                            <RichTextEditor.ControlsGroup>
                                                <RichTextEditor.BulletList active={editor?.isActive("bulletList")} />
                                                <RichTextEditor.OrderedList active={editor?.isActive("orderedList")} />
                                            </RichTextEditor.ControlsGroup>

                                            <RichTextEditor.ControlsGroup>
                                                <RichTextEditor.Undo />
                                                <RichTextEditor.Redo />
                                            </RichTextEditor.ControlsGroup>
                                        </RichTextEditor.Toolbar>

                                        {/* Content */}
                                        <RichTextEditor.Content
                                            className="card-editor min-h-[150px] rounded-md p-3 border border-gray-300"
                                        />
                                    </RichTextEditor>
                                </div>

                                {/* Buttons */}
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
                        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" style={{ maxHeight: "600px", overflowY: "auto" }}>
                            <DialogHeader>
                                <DialogTitle>Detail Berita</DialogTitle>
                            </DialogHeader>

                            {detailNews && (
                                <div className="space-y-3 text-sm">

                                    {/* Title */}
                                    <div>
                                        <label className="block mb-1">Judul</label>
                                        <input
                                            type="text"
                                            disabled={!isEditNews}
                                            value={newsForm.title}
                                            onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* Description WYSIWYG */}
                                    <div>
                                        <label className="block mb-1">Deskripsi</label>

                                        {editorDetail && (
                                            <RichTextEditor editor={editorDetail}>

                                                {/* Toolbar hanya muncul saat edit */}
                                                {isEditNews && (
                                                    <RichTextEditor.Toolbar className="transition-all rounded-md p-1 ring-2 ring-blue-500 bg-blue-50">
                                                        <RichTextEditor.ControlsGroup>
                                                            <RichTextEditor.Bold active={editorDetail.isActive("bold")} />
                                                            <RichTextEditor.Italic active={editorDetail.isActive("italic")} />
                                                            <RichTextEditor.Underline active={editorDetail.isActive("underline")} />
                                                            <RichTextEditor.Strikethrough active={editorDetail.isActive("strike")} />
                                                        </RichTextEditor.ControlsGroup>

                                                        <RichTextEditor.ControlsGroup>
                                                            <RichTextEditor.H1 active={editorDetail.isActive("heading", { level: 1 })} />
                                                            <RichTextEditor.H2 active={editorDetail.isActive("heading", { level: 2 })} />
                                                            <RichTextEditor.H3 active={editorDetail.isActive("heading", { level: 3 })} />
                                                        </RichTextEditor.ControlsGroup>

                                                        <RichTextEditor.ControlsGroup>
                                                            <RichTextEditor.BulletList active={editorDetail.isActive("bulletList")} />
                                                            <RichTextEditor.OrderedList active={editorDetail.isActive("orderedList")} />
                                                        </RichTextEditor.ControlsGroup>

                                                        <RichTextEditor.ControlsGroup>
                                                            <RichTextEditor.Undo />
                                                            <RichTextEditor.Redo />
                                                        </RichTextEditor.ControlsGroup>
                                                    </RichTextEditor.Toolbar>
                                                )}

                                                {/* Content */}
                                                <RichTextEditor.Content className="card-editor min-h-[150px] rounded-md p-3 border border-gray-300" />

                                            </RichTextEditor>
                                        )}
                                    </div>

                                    {/* Author */}
                                    <div>
                                        <label className="block mb-1">Penulis</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={newsForm.author}
                                            className="w-full bg-gray-100 border rounded px-3 py-2"
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 mt-4">
                                        {!isEditNews && (
                                            <Button onClick={() => setIsEditNews(true)}>Edit</Button>
                                        )}
                                        {isEditNews && (
                                            <>
                                                <Button variant="outline" onClick={() => setIsEditNews(false)}>Batal</Button>
                                                <Button onClick={updateNews}>Simpan</Button>
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
                                <h2 className="text-xl text-gray-900">Kelola Jasa</h2>

                                <div className="flex items-center gap-3 ml-auto">
                                    <input
                                        type="text"
                                        placeholder="Filter berdasarkan judul..."
                                        value={filterProductTitle}
                                        onChange={(e) => { setFilterProductTitle(e.target.value); setProductPage(1); }}
                                        className="border rounded px-3 py-2 text-sm w-60"
                                    />

                                    <Button onClick={() => setShowAddProductModal(true)}>
                                        Tambah Jasa
                                    </Button>
                                </div>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Kategori</TableHead>
                                        {/* <TableHead>Deskripsi</TableHead> */}
                                        <TableHead>Penulis</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                        <TableHead>Diperbarui</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {productList.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell>{p.title}</TableCell>
                                            <TableCell>{p.category}</TableCell>
                                            {/* <TableCell>{p.description}</TableCell> */}
                                            <TableCell>{p.author}</TableCell>
                                            <TableCell>{new Date(p.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>{new Date(p.updateAt).toLocaleString()}</TableCell>

                                            <TableCell className="flex gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => getDetailProduct(p.id)}>
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        openDeleteModal(
                                                            "Apakah Anda yakin ingin menghapus Jasa ini?",
                                                            async () => {
                                                                await deleteProduct(p.id);
                                                                setShowDeleteModal(false);
                                                            }
                                                        )
                                                    }
                                                >
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
                                    Sebelumnya
                                </Button>

                                <span className="text-sm text-gray-600">
                                    Halaman {productPage} dari {productTotalPages}
                                </span>

                                <Button
                                    onClick={() => setProductPage((p) => Math.min(productTotalPages, p + 1))}
                                    disabled={productPage === productTotalPages}
                                    variant="outline"
                                >
                                    Selanjutnya
                                </Button>
                            </div>

                        </Card>
                    </TabsContent>

                    {/* Add Jasa Modal */}
                    <Dialog open={showAddProductModal} onOpenChange={setShowAddProductModal}>
                        <DialogContent className="max-w-lg" style={{ maxHeight: "600px", overflowY: "auto" }}>
                            <DialogHeader>
                                <DialogTitle>Tambah Jasa</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-3 text-sm">

                                <div>
                                    <label className="block mb-1">Judul</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={addProductData.title}
                                        onChange={(e) => setAddProductData({ ...addProductData, title: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1">Kategori</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={addProductData.category}
                                        onChange={(e) => setAddProductData({ ...addProductData, category: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1">Deskripsi</label>
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
                        <DialogContent className="max-w-lg" style={{ maxHeight: "600px", overflowY: "auto" }}>
                            <DialogHeader>
                                <DialogTitle>Detail Jasa</DialogTitle>
                            </DialogHeader>

                            {detailProduct && (
                                <div className="space-y-3 text-sm">

                                    <div>
                                        <label className="block mb-1">Judul</label>
                                        <input
                                            type="text"
                                            disabled={!isEditProduct}
                                            className="w-full border rounded px-3 py-2"
                                            value={productForm.title}
                                            onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1">Kategori</label>
                                        <input
                                            type="text"
                                            disabled={!isEditProduct}
                                            className="w-full border rounded px-3 py-2"
                                            value={productForm.category}
                                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1">Deskripsi</label>
                                        <textarea
                                            disabled={!isEditProduct}
                                            className="w-full border rounded px-3 py-2"
                                            value={productForm.description}
                                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block mb-1">Penulis</label>
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

                    {/* Training Participant Tab */}
                    <TabsContent value="trainingParticipant">
                        <Card className="p-6">

                            {/* Header + Filter */}
                            <div className="flex items-center justify-between mb-6">

                                <h2 className="text-xl text-gray-900">Peserta training</h2>

                                <div className="flex items-center gap-3 ml-auto">
                                    <input
                                        type="text"
                                        placeholder="Filter bedasarkan nama..."
                                        value={filterTPName}
                                        onChange={(e) => {
                                            setFilterTPName(e.target.value);
                                            setTpPage(1);
                                        }}
                                        className="border rounded px-3 py-2 text-sm w-60"
                                    />
                                </div>
                            </div>

                            {/* TABLE */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Jenis</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Telepon</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Pelatihan</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                        <TableHead>Aksi</TableHead>

                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {tpList.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell>{p.name}</TableCell>
                                            <TableCell>{p.participantType}</TableCell>
                                            <TableCell>{p.email}</TableCell>
                                            <TableCell>{p.phoneNumber}</TableCell>
                                            <TableCell>{p.status}</TableCell>
                                            <TableCell>{p.training}</TableCell>
                                            <TableCell>{new Date(p.createdAt).toLocaleString()}</TableCell>

                                            <TableCell className="flex gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => getDetailTP(p.id)}>
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        openDeleteModal(
                                                            "Apakah Anda yakin ingin menghapus peserta training ini?",
                                                            async () => {
                                                                await deleteTP(p.id);
                                                                setShowDeleteModal(false);
                                                            }
                                                        )
                                                    }
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
                                <select
                                    value={tpLimit}
                                    onChange={(e) => {
                                        setTpLimit(Number(e.target.value));
                                        setTpPage(1);
                                    }}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value={10}>10</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>

                                <Button
                                    onClick={() => setTpPage((p) => Math.max(1, p - 1))}
                                    disabled={tpPage === 1}
                                    variant="outline"
                                >
                                    Sebelumnya
                                </Button>

                                <span className="text-sm text-gray-600">
                                    Halaman {tpPage} dari {tpTotalPages}
                                </span>

                                <Button
                                    onClick={() => setTpPage((p) => Math.min(tpTotalPages, p + 1))}
                                    disabled={tpPage === tpTotalPages}
                                    variant="outline"
                                >
                                    Selanjutnya
                                </Button>
                            </div>

                        </Card>
                    </TabsContent>

                    <Dialog open={showTPModal} onOpenChange={(v) => {
                        setShowTPModal(v);
                        if (!v) setIsEditTP(false);
                    }}>
                        <DialogContent className="max-w-lg" style={{ maxHeight: "600px", overflowY: "auto" }}>
                            <DialogHeader>
                                <DialogTitle>Detail Peserta</DialogTitle>
                            </DialogHeader>

                            {detailTP && (
                                <div className="space-y-3 text-sm">

                                    <div>
                                        <label className="block mb-1">Nama</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={tpForm.name}
                                            className="w-full border rounded px-3 py-2 bg-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1">Status</label>
                                        <select
                                            disabled={!isEditTP}
                                            value={tpForm.status}
                                            onChange={(e) => setTpForm({ ...tpForm, status: e.target.value })}
                                            className="w-full border rounded px-3 py-2"
                                        >
                                            <option value="REGISTERED">REGISTERED</option>
                                            <option value="DONE">DONE</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-end gap-3 mt-4">
                                        {!isEditTP && (
                                            <Button onClick={() => setIsEditTP(true)}>Edit</Button>
                                        )}

                                        {isEditTP && (
                                            <>
                                                <Button variant="outline" onClick={() => setIsEditTP(false)}>
                                                    Cancel
                                                </Button>
                                                <Button onClick={updateTP}>Save</Button>
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