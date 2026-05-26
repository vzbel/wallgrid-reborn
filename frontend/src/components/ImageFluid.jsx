/**
 * a responsive image
 *
 * props
 * className: extra div styles
 * src: image url
 */

const ImageFluid = (props) => {
  let outerClass = "rounded-md shadow-md overflow-hidden";
  if (props.className) {
    outerClass += " " + props.className;
  }

  return (
    <div className={outerClass}>
      <img src={props.src} className="h-full w-full object-cover" />
    </div>
  );
};

export default ImageFluid;
