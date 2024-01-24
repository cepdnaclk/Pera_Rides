const stations = [
    {
      id: 1,
      name: 'Station 1',
    //   price: '39.99',
      like: true,
      img: require('../assets/images/station1.png'),
      status: 'Available for use bicycles',
      slots: '10',
      amount: 3,
      about:
        'This is a station in the University of Peradeniya, it is located in the Engineering faculty',
    },
  
    {
      id: 2,
      name: 'Station 2',
    //   price: '29.99',
      like: false,
      img: require('../assets/images/station2.jpg'),
      status: 'Not Available for use bicycles',
      slots: '5',
      amount: 1,
      about:
        'This is a station in the University of Peradeniya, it is located in the AHS faculty',
      location: {
        latitude: 7.2579,  // Replace with the actual latitude of Station 1
        longitude: 80.5950,  // Replace with the actual longitude of Station 1
      },
    },
    {
      id: 3,
      name: 'Station 3',
    //   price: '25.99',
      like: false,
      img: require('../assets/images/station3.png'),
      status: 'Not Available for use bicycles',
      slots: '7',
      amount: 5,
      about:
        'This is a station in the University of Peradeniya, it is located in the Agriculture faculty',
    },
  
    {
      id: 4,
      name: 'Station 4',
    //   price: '25.99',
      like: true,
      img: require('../assets/images/station4.jpg'),
      status: 'Available for use bicycles',
      slots: '6',
      amount: 6,

      about:
        'This is a station in the University of Peradeniya, it is located in the Wus Premises',
    },
    {
      id: 5,
      name: 'Station 5',
    //   price: '50.99',
      like: true,
      img: require('../assets/images/station5.jpg'),
      status: 'Not Available for use bicycles',
      slots: '9',
      amount: 7,
      about:
        'This is a station in the University of Peradeniya, it is located in the Art faculty',
    },
    {
      id: 6,
      name: 'Station 6',
    //   price: '50.99',
      like: false,
      img: require('../assets/images/station6.jpg'),
      status: 'Available for use bicycles',
      slots: '8',
      amount: 8,
      about:
        'This is a station in the University of Peradeniya, it is located in the Medicine faculty',
    },
  ];
  
  export default stations;