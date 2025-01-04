import { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <motion.div
      className="pb-16 text-center"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1>See the magic. Try now</h1>
      <button
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500 mt-2"
        onClick={onClickHandler}
      >
        Generate Images
        <img className="h-6" src={assets.star_group} alt="stars" />
      </button>
    </motion.div>
  );
};
export default GenerateBtn;
