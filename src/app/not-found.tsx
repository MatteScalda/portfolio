export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          background: "#09090b",
          color: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "4rem", fontWeight: 800, color: "#22d3ee" }}>
            404
          </h1>
          <p style={{ color: "#a1a1aa" }}>Page not found.</p>
        </div>
      </body>
    </html>
  );
}
