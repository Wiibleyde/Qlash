"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
}

const userApiUrl = `http://${process.env.NEXT_PUBLIC_HOST}:8000/user`;

const ProfilePage = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState<string>("");

  const fetchUser = async (userId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    try {
      const response = await fetch(`${userApiUrl}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          setError("Accès interdit : vous ne pouvez consulter que votre propre profil.");
        } else {
          setError("Erreur lors du chargement du profil.");
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      setUser(data);
      setEditedName(data.name || "");
    } catch {
      setError("Erreur réseau lors du chargement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !userData) {
      router.push("/signin");
      return;
    }

    const currentUser = JSON.parse(userData) as User;
    fetchUser(currentUser.id);
  }, [router]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    if (user) setEditedName(user.name || "");
    setIsEditing(false);
    setError("");
  };

  const handleSaveClick = async () => {
    if (!user) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token manquant, veuillez vous reconnecter.");
      return;
    }

    try {
      const response = await fetch(`${userApiUrl}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editedName }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          setError("Accès interdit : vous ne pouvez modifier que votre propre profil.");
        } else {
          setError("Erreur lors de la mise à jour du profil.");
        }
        return;
      }

      await fetchUser(user.id);
      setIsEditing(false);
      setError("");
    } catch {
      setError("Erreur réseau lors de la mise à jour.");
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement du profil...</div>;

  if (error)
    return (
      <div className="p-8 text-center text-red-600">
        {error}
        <div className="mt-4">
          <Button onClick={() => router.push("/")}>Retour à l&apos;accueil</Button>
        </div>
      </div>
    );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center">
      <Navbar />
      <main className="flex flex-1 p-10 justify-center mt-20 max-w-3xl w-full">
        <div className="flex items-center space-x-10 w-full bg-white rounded-lg p-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold cursor-default select-none">
            {user.name}
          </div>

          <div className="flex flex-col space-y-4 flex-grow">
            <div>
              <label htmlFor="name" className="block font-semibold mb-1 min-h-[2.5rem]">
                Nom
              </label>
              {isEditing ? (
                <input
                  id="name"
                  type="text"
                  value={editedName || ""}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                  style={{ minHeight: "2.5rem" }}
                />
              ) : (
                <p className="text-2xl font-extrabold min-h-[2.5rem] mt-2">{user.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold mb-1 min-h-[2.5rem]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email || ""}
                disabled
                className="w-full border border-gray-200 rounded-md p-2 bg-gray-100 text-gray-500 cursor-not-allowed min-h-[2.5rem]"
              />
            </div>

            <div className="pt-4 flex space-x-4">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSaveClick}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer transition transform hover:-translate-y-0.5 hover:scale-[1.05] duration-300"
                  >
                    Enregistrer
                  </Button>
                  <Button
                    onClick={handleCancelClick}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 cursor-pointer transition transform hover:-translate-y-0.5 hover:scale-[1.05] duration-300"
                  >
                    Annuler
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleEditClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white hover:cursor-pointer transition transform hover:-translate-y-0.5 hover:scale-[1.05] duration-300"
                >
                  Modifier
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <div className="hidden lg:flex flex-1 h-full items-center justify-center mt-10 w-full">
        <Image
          src="/images/profile.svg"
          alt="profile illustration"
          width={400}
          height={200}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
