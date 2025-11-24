import { useState, useEffect } from "react";
import { Code, Palette, Briefcase, LineChart, Smartphone, Database } from "lucide-react";
import { Card } from "./ui/card";
import { projectId, publicAnonKey } from "../utils/supabase/info";

const categoryIcons: Record<string, any> = {
    "Pemrograman": { icon: Code, color: "from-blue-700 to-blue-900" },
    "Desain": { icon: Palette, color: "from-blue-500 to-blue-600" },
    "Bisnis": { icon: Briefcase, color: "from-blue-600 to-blue-700" },
    "Data Science": { icon: LineChart, color: "from-blue-600 to-blue-800" },
    "Mobile Dev": { icon: Smartphone, color: "from-blue-400 to-blue-500" },
    "Database": { icon: Database, color: "from-blue-800 to-blue-950" },
};

export function Categories() {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/courses`,
                {
                    headers: { Authorization: `Bearer ${publicAnonKey}` },
                }
            );

            if (!response.ok) {
                console.warn('Categories API not available yet');
                setCategories([]);
                return;
            }

            const data = await response.json();
            const courses = data.courses || [];

            // Count courses per category
            const categoryCount: Record<string, number> = {};
            courses.forEach((course: any) => {
                const cat = course.category || 'Lainnya';
                categoryCount[cat] = (categoryCount[cat] || 0) + 1;
            });

            // Build categories array
            const cats = Object.entries(categoryCount).map(([name, count]) => {
                const iconData = categoryIcons[name] || { icon: Code, color: "from-gray-500 to-gray-600" };
                return {
                    icon: iconData.icon,
                    name,
                    courses: count,
                    color: iconData.color,
                };
            });

            setCategories(cats);
        } catch (error) {
            // Silently handle error - API might not be deployed yet
            setCategories([]);
        }
    };
    return (
        <section id="categories" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.length > 0 ? (
                        categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <Card
                                    key={category.name}
                                    className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-blue-400"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl text-gray-900 mb-1">{category.name}</h3>
                                            <p className="text-gray-600">{category.courses.toLocaleString()} Kursus</p>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">
                                Kategori akan muncul setelah kursus ditambahkan
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
