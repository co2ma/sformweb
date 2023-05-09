import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import "./ItemDetail.css";

const ItemDetail = () => {
  const [product, setProduct] = useState(null);
  const [fundingSettings, setFundingSettings] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(firestore, "projects", productId);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        setProduct(productDoc.data());
        setFundingSettings(productDoc.data().fundingSettings || []);
      } else {
        console.error("Project not found");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleFundingClick = () => {
    alert("펀딩 완료");
  };

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div className="product-details">
      <h1>{product.title}</h1>
      <div
        className="product-content"
        dangerouslySetInnerHTML={{ __html: product.content }}
      ></div>
      {fundingSettings.map((setting, index) => (
        <button key={index} className="funding-button" onClick={handleFundingClick}>
          {setting.fundname} - {setting.funddetail} - {setting.fundfee}원 펀딩하기
        </button>
      ))}
    </div>
  );
};

export default ItemDetail;