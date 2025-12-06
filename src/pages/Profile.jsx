import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { authService } from "../services/authService";
import { disconnectEcho } from "../services/echoService";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Briefcase,
  Building,
  LogOut,
  Shield,
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      disconnectEcho();
      logout();
      navigate("/login");
    }
  };

  const profileInfo = [
    { icon: Mail, label: "Email", value: user?.email },
    { icon: Phone, label: "Phone", value: user?.phone || "Not provided" },
    { icon: Briefcase, label: "Designation", value: user?.designation },
    { icon: Building, label: "Department", value: user?.department },
    { icon: Shield, label: "User Level", value: user?.user_level },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg safe-top">
        <div className="px-6 py-5 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Profile
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-xl">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {user?.employee_type || "Employee"}
            </p>
          </div>

          {/* Profile Information */}
          <div className="space-y-3">
            {profileInfo.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-900 font-semibold truncate">
                    {item.value || "Not provided"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        {user?.RA_name && (
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Reporting Manager
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Name</span>
                <span className="text-sm text-gray-900 font-semibold">
                  {user.RA_name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Designation</span>
                <span className="text-sm text-gray-900 font-semibold">
                  {user.RA_designation}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Level</span>
                <span className="text-sm text-gray-900 font-semibold">
                  {user.RA_level}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-3xl shadow-lg hover:shadow-xl transition-all active:scale-95 font-bold"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
