import React, { useState, useEffect } from "react";
import ScrollToTop from "@/utils/scroll_top";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  getProductById,
  getProductColor,
  getProductColorById,
  getProductDimensionById,
  getProductRating,
  getDiscountById,
  addItemToCart,
  getCategoriesById,
  getAllProductFeedback,
} from "@/api/api_function";
import {
  Box,
  Typography,
  Rating,
  Button,
  IconButton,
  CardActionArea,
  LinearProgress,
} from "@mui/material";
import { styleButtonAddCart, styleButtonView } from "@/utils/ui";
import Breadcrumbs from "@/components/BreadcrumbsProduct";
import IconFavourite from "@/components/customs/IconFavourite";
import ProductImages from "@/components/ProductImage";
import NumberInput from "@/components/customs/NumberInput";
import moveToProduct from "@/redux/reducers/product_reducers";
import { set } from "react-hook-form";
import ProductSlide from "@/components/ProductSlide";
import { notify } from "@/redux/reducers/notify_reducers";
import Feedback from "@/components/Feedback";
import ProductCarousel from "@/components/ProductCarousel";

interface productInfor {
  product: any;
}

interface Color {
  _id: string;
  colorName: string;
  colorHex: string;
  productId: string;
  colorId: string;
  productQuantity: number;
}

const Collection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const currentCart = useSelector((state: RootState) => state.cart);
  const allProduct = useSelector((state: RootState) => state.all.allProduct);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [listColor, setListColor] = useState<Color[]>([]);
  const [chooseColor, setChooseColor] = useState<Color | null>(null);
  const [dimension, setDimension] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [discountNotExpired, setDiscountNotExpired] = useState<boolean>(true);
  const [priceLoading, setPriceLoading] = useState<boolean>(false);
  const [canCheckOut, setCanCheckOut] = useState<boolean>(false);
  const [productFeedback, setProductFeedback] = useState<any[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  const discountFailed = () => {
    setDiscountNotExpired(false);
    setDiscount(0);
    setPriceLoading(false);
  };

  const discountSuccess = () => {
    setDiscountNotExpired(true);
    setPriceLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      if (id === undefined) {
        return <div className="p-5 text-xl">Không tìm thấy sản phẩm!</div>;
      }
      try {
        //product
        const productRes = await getProductById(id);
        const product = productRes.data.data;
        console.log("product", product);
        setProduct(product);
        setPrice(product.productPrice);
        // Color
        // const productColorRes = await getProductColor(id);
        // const productColor = productColorRes.data.data;

        // Dimension
        // const productDimensionRes = await getProductDimensionById(id);
        // const productDimension = productDimensionRes.data.data;
        // setDimension(productDimension);

        // Rating
        // const productRatingRes = await getProductRating(id);
        // const productRating = productRatingRes.data;
        // setRating(productRating.averageRating);

        if (product?.productDiscountId) {
          setPriceLoading(true);
          const productDiscountRes = await getDiscountById(
            product.productDiscountId
          );
          const productDiscount = productDiscountRes.data.data;
          if (!productDiscount?.success) {
            discountSuccess();
          } else {
            discountFailed();
            return;
          }
          const error = productDiscountRes.data.error;
          console.log("error", error);
          // console.log('productDiscount', productDiscount)
          if (
            productDiscount &&
            new Date(productDiscount.discountEndDate) > new Date() &&
            new Date(productDiscount.discountStartDate) < new Date()
          ) {
            setDiscount(productDiscount.discountPercent);
            setDiscountNotExpired(true);
            handlePrice(product.productPrice);
          } else {
            discountFailed();
          }

          if (error) {
            discountFailed();
            console.log("errorDiscount1", error);
          }
        } else {
          discountFailed();
          console.log("errorDiscount2");
        }

        // const listColor = await Promise.all(
        //   productColor.map(async (color: any) => {
        //     const listColorRes = await getProductColorById(color._id);
        //     const listColor = listColorRes.data.color;
        //     // console.log('listColor1', listColor)
        //     return { ...color, ...listColor, colorId: color._id };
        //   })
        // );
        // if (listColor.length > 0) {
        //   setListColor(listColor);
        //   setChooseColor(listColor[0]);
        // }
      } catch (error) {
        console.error(error);
        discountFailed();
      }

      return price;
    }

    fetchData();
  }, [id, allProduct, currentUser]);

  const handlePrice = async (tempPrice: number) => {
    if (discountNotExpired && product && product.productPrice) {
      const newPrice = (tempPrice * (100 - discount)) / 100;
      setPrice(newPrice);
      console.log("newPrice", newPrice);
    }
  };

  const handleRelatedProducts = async () => {
    if (product) {
      const res = allProduct.filter(
        (slide: any) =>
          slide.category_id === product.productCategoryId &&
          slide._id !== product._id
      );
      setRelatedProducts(() => [...res]);
    }
  };

  useEffect(() => {
    if (discount) {
      handlePrice(product.productPrice);
    }
    setPriceLoading(false);
  }, [discount]);

  useEffect(() => {
    handleRelatedProducts();
  }, [allProduct]);

  useEffect(() => {
    const getColor = async () => {
      if (!id) return;
      const productColorRes = await getProductColor(id);
      const productColor = productColorRes.data.data;
      const listColor = await Promise.all(
        productColor.map(async (color: any) => {
          const listColorRes = await getProductColorById(color._id);
          const listColor = listColorRes.data.color;
          // console.log('listColor1', listColor)
          return { ...color, ...listColor, colorId: color._id };
        })
      );
      // console.log('listColor2', listColor)
      if (listColor.length > 0) {
        setListColor(listColor);
        setChooseColor(listColor[0]);
      }
    };
    getColor();
  }, [id]);

  useEffect(() => {
    const getDimension = async () => {
      if (!id) return;
      const productDimensionRes = await getProductDimensionById(id);
      const productDimension = productDimensionRes.data.data;
      setDimension(productDimension);
    };
    getDimension();
  }, [id]);

  useEffect(() => {
    const getRating = async () => {
      if (!id) return;
      const productRatingRes = await getProductRating(id);
      const productRating = productRatingRes.data;
      setRating(productRating.averageRating);
    };
    getRating();
  }, [id]);

  const handleColorClick = (color: Color) => {
    setChooseColor(color);
  };

  useEffect(() => {
    try {
      if (id) {
        getAllProductFeedback(id).then((res) => {
          if (res.data.data) {
            setProductFeedback(res.data.data);
          }
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  }, [id]);

  if (!product) {
    return (
      <div>
        <Breadcrumbs />
        <div className="p-6">
          Chúng tôi không thể truy cập sản phẩm. Bạn có thể xem các sản phẩm
          khác tại:{" "}
          <Link className="font-bold text-dark-0" to={"/product"}>
            Quay lại trang sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const handleScrollToReviews = () => {
    const reviewsSection = document.getElementById("reviews");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  async function handleAddToCart() {
    if (!currentUser) {
      navigate("/signin");
      return;
    } else if (
      chooseColor?.productQuantity &&
      quantity >= chooseColor?.productQuantity
    ) {
      dispatch(
        notify({
          isSuccess: false,
          isError: true,
          isInfo: false,
          message: "Số lượng sản phẩm vượt quá số lượng hiện có",
        })
      );
      setCanCheckOut(false);
      return;
    } else if (!chooseColor?.productQuantity) {
      dispatch(
        notify({
          isSuccess: false,
          isError: true,
          isInfo: false,
          message: "Sản phẩm hiện không có sẵn",
        })
      );
      setCanCheckOut(false);
      return;
    }
    try {
      console.log("currentCart", currentCart._id);
      console.log("currentUser", currentUser);
      console.log("productId", product._id);
      console.log("chooseColor", chooseColor?.colorId || "", 1);
      await addItemToCart(
        currentCart._id,
        currentUser,
        product._id,
        chooseColor?.colorId || "",
        quantity
      );
      setCanCheckOut(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCheckout() {
    handleAddToCart();
    if (canCheckOut) {
      navigate("/order");
    }
  }

  return (
    <div className="mx-4 pr-2 md:mx-12">
      <ScrollToTop />
      {/* product Currently unavailable */}
      {!product.productStatus && (
        <section className="mt-2 flex justify-center p-2 text-xl font-bold text-red-700">
          Sản phẩm này hiện không có sẵn
        </section>
      )}
      {/* top */}
      <section className="flex justify-between">
        <Breadcrumbs />
        <div className="flex justify-center py-2">
          <p className="flex items-center text-lg text-black">Yêu thích</p>
          <IconFavourite productId={product._id} />
        </div>
      </section>

      <section className="md:flex md:flex-wrap">
        {/* mid left */}
        <div className="md:w-2/3">
          {chooseColor && (
            <ProductImages
              productId={id ? id : "nan"}
              colorId={chooseColor.colorId ?? listColor[0].colorId}
            />
          )}
        </div>

        {/* mid right */}
        <div className="md:w-1/3">
          {/* product name */}
          {product.productStatus && (
            <div className="md:flex md:justify-start">
              <div>
                {/* name */}
                <h1 className="text-2xl font-bold">{product.productName}</h1>
                <div className="flex justify-normal">
                  <Rating
                    name="read-only"
                    precision={0.5}
                    value={rating ? rating : 0}
                    readOnly
                  />
                  <p
                    onClick={handleScrollToReviews}
                    className="text-md ml-2 text-gray-600"
                  >
                    Đã bán:
                  </p>
                  <p className="text-md ml-1 text-gray-600">
                    {product.productSold}
                  </p>
                </div>
                {/* price */}
                <div className="flex items-center justify-start py-1">
                  {discountNotExpired && (
                    <p className="mr-3 text-xl text-dark-1 line-through">
                      {product.productPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  )}
                  {priceLoading ? (
                    <Box sx={{ width: "100px", marginRight: "10px" }}>
                      <LinearProgress />
                    </Box>
                  ) : (
                    <p className="mr-3 text-2xl text-black">
                      {product?.productQuantity > 0 ? (
                        price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      ) : (
                        <></>
                      )}
                    </p>
                  )}
                  {discountNotExpired && (
                    <div className="flex items-center rounded-md bg-red-500 px-2 font-bold text-white">
                      <span className="mr-2 text-2xl">{discount}%</span>
                      <span className="text-xl">Giảm</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* color */}
          <>
            <div className="flex items-center">
              <p className="mr-1 text-lg font-bold">Màu: </p>
              <p>{chooseColor?.colorName}</p>
            </div>
            {listColor && (
              <div className="flex justify-start">
                {listColor.map((color: Color) => (
                  <div key={color._id} className="p-2">
                    <div
                      className={`h-8 w-8 cursor-pointer rounded-full ${
                        chooseColor?.colorId === color.colorId
                          ? "border-1 border-black"
                          : ""
                      }`}
                      style={{
                        backgroundColor: color.colorHex,
                        boxShadow:
                          chooseColor?.colorId === color.colorId
                            ? "inset 0 0 0 2px white, 0 0 0 0.5px black"
                            : "",
                      }}
                      onClick={() => handleColorClick(color)}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
          {product?.productQuantity > 0 ? (
            <div className="">
              {/* quantity */}
              <div className="flex justify-start">
                <p className="text-lg font-bold">Số lượng: </p>
                <p className="ml-1 text-lg">{product.productQuantity}</p>
              </div>

              <div className="flex justify-start">
                <p className="text-lg font-bold">Đã bán: </p>
                <p className="ml-1 text-lg">{product.productSold}</p>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div>
            {/* weight */}
            {/* dimension */}
            {dimension && (
              <div className="flex justify-start">
                <p className="text-lg font-bold">Kích thước: </p>
                <p className="ml-1 text-lg">
                  Dài: {dimension[0]?.productLength} m,
                </p>
                <p className="ml-1 text-lg">
                  Rộng: {dimension[0]?.productWidth} m,
                </p>
                <p className="ml-1 text-lg">
                  Cao: {dimension[0]?.productHeight} m
                </p>
              </div>
            )}
            {dimension && (
              <div className="flex justify-start">
                <p className="text-lg font-bold">Cân nặng: </p>

                <p className="ml-1 text-lg">{dimension[0]?.productWeight} kg</p>
              </div>
            )}
            {/* Description */}
            {product.productDescription && (
              <div className="">
                <p className="block text-lg font-bold">Mô tả: </p>
                <p className="ml-1 text-lg">{product.productDescription}</p>
              </div>
            )}
          </div>
          {/* buy */}
          {product.productQuantity ? (
            <div>
              <div className="my-2 flex justify-center">
                <NumberInput value={quantity} onChange={setQuantity} />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    paddingRight: "50px",
                    paddingLeft: "50px",
                    marginRight: "2px",
                  }}
                  sx={styleButtonAddCart}
                  onClick={() => {
                    handleCheckout();
                  }}
                >
                  Mua ngay
                </Button>
                <Button
                  className="hover:text-white"
                  variant="outlined"
                  style={{
                    marginLeft: "4px",
                    color: "#A67F78",
                    padding: "10px",
                  }}
                  sx={styleButtonView}
                  onClick={() => handleAddToCart()}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="py-8 font-cormorant-garamond text-xl font-bold italic">
                Sản phẩm này tạm thời không bán!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Look like */}
      <section className="mt-4">
        <div className="flex justify-center py-7 text-center text-xl text-black">
          Sản phẩm tương tự
        </div>
        <ProductCarousel products={relatedProducts} />
      </section>
      {/* Rating */}
      <section className="mx-auto mt-2 max-w-screen-md shadow-xl">
        <div
          id="reviews"
          className="flex justify-center py-7 text-center text-xl text-black"
        >
          {`Đánh giá (tổng ${productFeedback?.length} đánh giá):`}
        </div>
        <div className="mx-4 bg-primary-5 ">
          <div className="h-max-content flex flex-col items-center justify-center space-y-1">
            <div className=" text-2xl">{rating ? rating : "0"} trên 5</div>
            <div>
              <Rating
                name="read-only"
                precision={0.5}
                value={rating ? rating : 0}
                readOnly
              />
            </div>
          </div>
        </div>
        {productFeedback ? (
          productFeedback.map((feedback: any) => (
            <Feedback key={feedback._id} feedback={feedback} />
          ))
        ) : (
          <div className="flex justify-center">
            <p>Chưa có đánh giá nào</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Collection;
