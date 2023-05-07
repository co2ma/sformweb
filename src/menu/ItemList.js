import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit, startAfter, where } from "firebase/firestore";
import { firestore, storage } from "../firebase";
import { Link } from "react-router-dom";
import "./ItemList.css";
import { getDownloadURL, ref, listAll } from "firebase/storage";

const ItemList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      const bannersRef = ref(storage, "banner");
      const bannerList = await listAll(bannersRef);
      const bannerURLs = await Promise.all(
        bannerList.items.map((item) => getDownloadURL(item))
      );
      setBanners(bannerURLs);
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [banners]);


  useEffect(() => {
    const fetchProducts = async () => {
      const lastVisible = currentPage > 1
        ? (await getDocs(query(collection(firestore, "projects"), orderBy("title"), limit(itemsPerPage * (currentPage - 1))))).docs.slice(-1)[0]
        : null;

      const productsQuery = query(
        collection(firestore, "projects"),
        where("isTempSave", "==", true), // 이 줄을 추가하세요.
        orderBy("title"),
        startAfter(lastVisible),
        limit(itemsPerPage)
      );

      const productsSnapshot = await getDocs(productsQuery);
      const productsList = productsSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="item-list-container">
      <div className="banner">
        {banners.length > 0 && (
          <img src={banners[currentBannerIndex]} alt="광고 배너" />
        )}
      </div>
      <div className="product-list">
        {products.map((product) => (
          <Link to={`/ItemList/${product.id}`} key={product.id}>
            <div className="product-card">
              <img src={product.imageSrc} alt={product.title} />
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>{product.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>
        <span>페이지 {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>
          다음
        </button>
      </div>
    </div>
  );
};

export default ItemList;