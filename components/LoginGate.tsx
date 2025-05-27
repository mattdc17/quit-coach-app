import { useState, useEffect } from "react";

export default function LoginGate({ children }: { children: React.ReactNode }) {
  const [pass, setPass] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access") === "granted") setIsAuthed(true);
  }, []);

  const checkPass = () => {
    if (pass === "coachpass") {
      localStorage.setItem("access", "granted");
      setIsAuthed(true);
    }
  };

  if (isAuthed) return <>{children}</>;

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>Enter Access Code</h1>
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <button onClick={checkPass} style={{ marginLeft: "10px" }}>Enter</button>
    </div>
  );
}
