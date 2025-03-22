// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// export default function Loading() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!loading) return null;

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <motion.div
//         className="w-16 h-16 border-t-4 border-teal border-solid rounded-full animate-spin"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/results"); // Redirect to results page after loading
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  if (!loading) return null;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-16 h-16 border-t-4 border-teal border-solid rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </div>
  );
}
