import Image from "next/image";

export default function CartProductSuccess({ product }) {
  const { productName, productImage, regularPrice, productPrice } = product;
  return (
    <div className="flex justify-start items-start gap-5">
      <div className="w-[150px] h-[150px] ">
        <Image src={productImage} width={100} height={100} alt="product" />
      </div>
      <div className="">
        <div className="flex justify-between items-start gap-x-10">
          <h3 className="text-lg font-semibold max-w-[500px]">{productName}</h3>
          <span className="text-lg font-semibold">৳{productPrice}</span> 
        </div>
        <div className="my-3">
          Previous Price : <del>৳{regularPrice}</del>
        </div>
      </div>
    </div>
  );
}


// pending: line: 13,16