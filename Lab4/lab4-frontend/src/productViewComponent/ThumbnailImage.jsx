function ThumbnailImage({ imgUrl, index, setSelectedImageIndex }) {
  return (
    <div className="item" onClick={() => setSelectedImageIndex(index)}>
      <img className="thumbnail-image" src={imgUrl} role="button" />
    </div>
  );
}

export default ThumbnailImage;
