import { useState } from "react";
import { registerUser } from "../../services/user.service";

export const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await registerUser(form);
      // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      setError("Error en el registro. Intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Registro de Usuario</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Nombre de usuario" value={form.username} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="text" name="firstName" placeholder="Nombre" value={form.firstName} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <input type="text" name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600">
          Registrarse
        </button>
      </form>
    </div>
  );
};
