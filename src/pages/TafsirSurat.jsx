import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TafsirSurat = () => {
  const { id } = useParams();
  const [tafsir, setTafsir] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTafsirSurat = async (idSurat) => {
    try {
      const response = await fetch(`https://equran.id/api/v2/tafsir/${idSurat}`);
      const data = await response.json();
      setTafsir(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data tafsir:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTafsirSurat(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!tafsir) return <p>Tafsir tidak ditemukan.</p>;

  return (
    <div className="container my-4">
      <h2>Tafsir Surat {tafsir.namaLatin}</h2>
      <p>{tafsir.nama} - {tafsir.arti}</p>
      <p><strong>Jumlah Ayat:</strong> {tafsir.jumlahAyat}</p>
      <hr />
      <ul className="list-group">
        {tafsir.tafsir.map((item) => (
          <li key={item.ayat} className="list-group-item">
            <strong>Ayat {item.ayat}:</strong>
            <p>{item.teks}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TafsirSurat;
