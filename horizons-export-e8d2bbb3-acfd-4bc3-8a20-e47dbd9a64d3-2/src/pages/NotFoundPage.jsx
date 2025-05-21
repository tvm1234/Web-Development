
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-brand-red font-bold text-9xl mb-4">404</div>
          <h1 className="text-3xl font-bold mb-4">पृष्ठ सापडले नाही</h1>
          <p className="text-gray-600 mb-8">
            आपण शोधत असलेले पृष्ठ अस्तित्वात नाही किंवा हलवले गेले आहे.
          </p>
          <Link to="/">
            <Button className="bg-brand-red hover:bg-brand-red/90">
              <Home className="mr-2 h-4 w-4" />
              मुख्यपृष्ठावर परत जा
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
