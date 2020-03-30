class Rental {
  constructor(
    id,
    title,
    description,
    bedrooms,
    guests,
    dailyRentalRate,
    address,
    city,
    state,
    zip,
    location,
    dateCreated,
    owner,
    mainImage,
    otherImages
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.bedrooms = bedrooms;
    this.guests = guests;
    this.dateCreated = dateCreated;
    this.owner = owner;
    this.mainImage = mainImage;
    this.otherImages = otherImages;
    this.dailyRentalRate = dailyRentalRate;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.location = location;
  }
}

export default Rental;
