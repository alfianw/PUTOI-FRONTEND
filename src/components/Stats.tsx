import { useState, useEffect } from "react";
import { TrendingUp, Users, Award, Star } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function Stats() {
  const [courseCount, setCourseCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch courses count
      const coursesResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/courses`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );
      
      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json();
        setCourseCount(coursesData.courses?.length || 0);
      }

      // Try to fetch users count (might fail if not logged in)
      try {
        const usersResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d9e5996a/users`,
          {
            headers: { Authorization: `Bearer ${publicAnonKey}` },
          }
        );
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUserCount(usersData.users?.length || 0);
        }
      } catch (err) {
        // Ignore error for users endpoint
      }
    } catch (error) {
      // Silently handle error - API might not be deployed yet
    }
  };

  const stats = [
    {
      icon: Users,
      value: userCount > 0 ? `${userCount.toLocaleString()}+` : "50,000+",
      label: "Siswa Aktif",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: TrendingUp,
      value: courseCount > 0 ? courseCount.toLocaleString() : "0",
      label: "Kursus Tersedia",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Award,
      value: "500+",
      label: "Instruktur Expert",
      color: "from-blue-800 to-blue-950",
    },
    {
      icon: Star,
      value: "95%",
      label: "Tingkat Kepuasan",
      color: "from-blue-400 to-blue-500",
    },
  ];
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div
                  className={`inline-flex w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl items-center justify-center mb-4`}
                >
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl text-white mb-2">{stat.value}</div>
                <div className="text-xl text-blue-100">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
