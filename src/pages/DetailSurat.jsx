import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import AudioPlayer from "../components/AudioPlayer";

const DetailSurat = () => {
  const { id } = useParams();
  const [surat, setSurat] = useState([]);
  const [tafsir, setTafsir] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);

  const getDetailSurat = (idSurat) => {
    fetch(`https://equran.id/api/v2/surat/${idSurat}`)
      .then((res) => res.json())
      .then((data) => {
        setSurat(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const getTafsirSurat = (idSurat) => {
    fetch(`https://equran.id/api/v2/tafsir/${idSurat}`)
      .then((res) => res.json())
      .then((data) => {
        setTafsir(data.data.tafsir);
      })
      .catch((error) => {
        console.error("Error fetching tafsir:", error);
      });
  };

  useEffect(() => {
    getDetailSurat(id);
    getTafsirSurat(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!surat) return <p>Surat tidak ditemukan.</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">
        {surat.namaLatin} ({surat.nama})
      </h2>
      <p><strong>Jumlah Ayat:</strong> {surat.jumlahAyat}</p>
      <p><strong>Arti:</strong> {surat.arti}</p>
      <p><strong>Deskripsi:</strong> {parse(surat.deskripsi)}</p>

      {/* Audio Murotal Surat */}
      <div className="mb-5">
        <h4 className="mb-2">Murottal Surat Lengkap</h4>
        <AudioPlayer
          url={surat.audioFull["05"]}
          currentAudio={currentAudio}
          setCurrentAudio={setCurrentAudio}
        />
      </div>

      {/* Ayat */}
      <div className="row g-4">
        {surat.ayat.map((ayat) => {
          const tafsirAyat = tafsir.find((t) => t.ayat === ayat.nomorAyat);
          return (
            <div
              key={ayat.nomorAyat}
              className="col-12 border rounded shadow-sm p-3"
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fs-4 arabic-text text-end">{ayat.teksArab}</span>
                <div className="d-flex align-items-center">
                  <span className="badge bg-primary me-2">{ayat.nomorAyat}</span>
                  <AudioPlayer
                    url={ayat.audio["05"]}
                    currentAudio={currentAudio}
                    setCurrentAudio={setCurrentAudio}
                  />
                </div>
              </div>
              <p className="mb-1 text-secondary">
                <strong>Terjemahan:</strong> {ayat.teksIndonesia}
              </p>
              {tafsirAyat && (
                <p className="text-muted">
                  <strong>Tafsir:</strong> {tafsirAyat.teks}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailSurat;
