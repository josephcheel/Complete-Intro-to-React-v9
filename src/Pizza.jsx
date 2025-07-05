const Pizza = ({ name, description, images }) => {
  return (
    <div className="pizza">
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={images} alt={name} />
    </div>
  );
};

export default Pizza;
