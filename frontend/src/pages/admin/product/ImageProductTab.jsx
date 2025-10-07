import { Carousel, Image } from "antd";

const ImageProductTab = (props) => {
  const { productDataDetail } = props;
  const image_url = `${import.meta.env.VITE_BACKEND_URL}${
    productDataDetail?.imagePaths?.image_path
  }`;

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className="w-[800px]">
      <Carousel afterChange={onChange} arrows infinite={false}>
        {productDataDetail?.imagePaths.map((image) => {
          return (
            <figure id={image.id} className="text-center">
              <Image width={200} src={image_url} />
            </figure>
          );
        })}
      </Carousel>
    </div>
  );
};
export default ImageProductTab;
