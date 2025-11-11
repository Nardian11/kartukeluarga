import React, { useState, useEffect } from "react";
import "./App.css";
import dataAwal from "./data.json";

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    no: "",
    nama: "",
    nik: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    agama: "",
    pendidikan: "",
    pekerjaan: "",
  });
  const [editIndex, setEditIndex] = useState(null); // null artinya sedang tidak mengedit

  useEffect(() => {
    setData(dataAwal);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      no: "",
      nama: "",
      nik: "",
      jenisKelamin: "",
      tempatLahir: "",
      tanggalLahir: "",
      agama: "",
      pendidikan: "",
      pekerjaan: "",
    });
    setEditIndex(null);
  };

  const handleAddOrUpdate = () => {
    if (!form.no || !form.nama || !form.nik) {
      alert("Mohon isi minimal No, Nama, dan NIK!");
      return;
    }

    if (editIndex !== null) {
      // jika sedang edit, update data
      const newData = [...data];
      newData[editIndex] = form;
      setData(newData);
      setEditIndex(null);
    } else {
      // jika bukan edit, tambahkan data baru
      setData([...data, form]);
    }

    resetForm();
  };

  const handleEdit = (index) => {
    setForm(data[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      resetForm();
    }
  };

  const handleSave = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
  };

  return (
    <div className="App">
      <h1>Data Kependudukan</h1>

      <div className="form-container">
        <h2>{editIndex !== null ? "Edit Data Kartu Keluarga" : "Tambah Data Kartu Keluarga"}</h2>
        <div className="form-grid">
          <input name="no" value={form.no} onChange={handleChange} placeholder="No" />
          <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama Lengkap" />
          <input name="nik" value={form.nik} onChange={handleChange} placeholder="NIK" />
          <input name="jenisKelamin" value={form.jenisKelamin} onChange={handleChange} placeholder="Jenis Kelamin" />
          <input name="tempatLahir" value={form.tempatLahir} onChange={handleChange} placeholder="Tempat Lahir" />
          <input type="date" name="tanggalLahir" value={form.tanggalLahir} onChange={handleChange} />
          <input name="agama" value={form.agama} onChange={handleChange} placeholder="Agama" />
          <input name="pendidikan" value={form.pendidikan} onChange={handleChange} placeholder="Pendidikan" />
          <input name="pekerjaan" value={form.pekerjaan} onChange={handleChange} placeholder="Pekerjaan" />
        </div>
        <div className="btn-group">
          <button className="btn add" onClick={handleAddOrUpdate}>
            {editIndex !== null ? "💾 Simpan Perubahan" : "➕ Tambah Data"}
          </button>
          <button className="btn save" onClick={handleSave}>📁 Simpan ke JSON</button>
          {editIndex !== null && (
            <button className="btn cancel" onClick={resetForm}>❌ Batal Edit</button>
          )}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Lengkap</th>
            <th>NIK</th>
            <th>Jenis Kelamin</th>
            <th>Tempat Lahir</th>
            <th>Tanggal Lahir</th>
            <th>Agama</th>
            <th>Pendidikan</th>
            <th>Pekerjaan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.no}</td>
              <td>{d.nama}</td>
              <td>{d.nik}</td>
              <td>{d.jenisKelamin}</td>
              <td>{d.tempatLahir}</td>
              <td>{d.tanggalLahir}</td>
              <td>{d.agama}</td>
              <td>{d.pendidikan}</td>
              <td>{d.pekerjaan}</td>
              <td>
                <button className="btn edit" onClick={() => handleEdit(i)}>✏️ Edit</button>
                <button className="btn delete" onClick={() => handleDelete(i)}>🗑️ Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
