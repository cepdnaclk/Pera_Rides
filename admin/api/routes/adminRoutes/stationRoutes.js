const Station = require("../../models/Station");
const router = require("express").Router();

// create a new station
router.post("/new/station", async (req, res) => {
  const stationName = req.body.name;
  const stationLocation = req.body.location;

  if (!stationName || !stationLocation) {
    return res.status(400).json("Station name required!");
  }

  try {
    const station = new Station({
      name: stationName,
      location: stationLocation,
    });
    const savedStation = await station.save();
    res.status(201).json(savedStation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a new qr value to station
router.patch("/new/qr/:stationId", async (req, res) => {
  const qrValue = req.body.qrValue;
  const stationId = req.params.stationId;

  if (!qrValue || !stationId) {
    return res.status(400).json("Station ID and QR value required!");
  }

  try {
    const foundStation = await Station.findById(stationId);
    if (!foundStation) {
      return res.status(404).json("Station with provided ID not found!");
    }

    foundStation.qrValues.push({ qr: qrValue });

    const savedStation = await foundStation.save();

    res.status(200).json(savedStation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update bike when parked(bikeId) in qr inside station
router.patch("/available/bike/:stationId", async (req, res) => {
  const stationId = req.params.stationId;
  const bikeId = req.body.bikeId;
  const qrValue = req.body.qrValue;

  if (!stationId || !bikeId) {
    return res.status(400).json("Station ID and Bicycle ID required!");
  }

  try {
    const foundStation = await Station.findById(stationId);
    if (!foundStation) {
      return res.status(404).json("Station with provided ID not found!");
    }

    const qrObject = foundStation.qrValues.find((item) => item.qr === qrValue);

    if (!qrObject) {
      return res
        .status(404)
        .json("Provided QR value not found in the station!");
    }

    qrObject.bike = bikeId;

    const savedStation = await foundStation.save();

    res.status(200).json(savedStation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update when no bike (null) in qr inside station
router.patch("/empty/bike/:stationId", async (req, res) => {
  const stationId = req.params.stationId;
  //   const bikeId = req.body.bikeId;
  const qrValue = req.body.qrValue;

  if (!stationId) {
    return res.status(400).json("Station ID and Bicycle ID required!");
  }

  try {
    const foundStation = await Station.findById(stationId);
    if (!foundStation) {
      return res.status(404).json("Station with provided ID not found!");
    }

    const qrObject = foundStation.qrValues.find((item) => item.qr === qrValue);

    if (!qrObject) {
      return res
        .status(404)
        .json("Provided QR value not found in the station!");
    }
    qrObject.bike = null;
    const savedStation = await foundStation.save();

    res.status(200).json(savedStation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get number of bikes parked in a station (all bikes)
router.get("/get/all/bikes", async (req, res) => {
  try {
    const values = await Station.aggregate([
      {
        $project: {
          stationName: "$name",
          bikesAvailable: {
            $size: {
              $filter: {
                input: "$qrValues",
                cond: { $ifNull: ["$$this.bike", false] },
              },
            },
          },
        },
      },
    ]);
    res.status(200).json(values);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all bikes per station
router.get("/get/bikes/:stationId", async (req, res) => {
  const stationId = req.params.stationId;
  if (!stationId) {
    return res.status(400).json("Station ID required!");
  }

  try {
    const foundStation = await Station.findById(stationId);
    if (!foundStation) {
      return res.status(404).json("Station with provided ID not found!");
    }
    let number = 0;
    const qrBikePairsArray = foundStation.qrValues;

    if (!qrBikePairsArray) {
      return res.status(404).json("QR and Bicycles not found!");
    }

    for (let qrBikePair of qrBikePairsArray) {
      if (qrBikePair.bike) {
        number++;
      }
    }

    return res.status(200).json({
      stationName: foundStation.name,
      stationId: stationId,
      bikes: number,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// remove qr-bike pair from station
router.patch("/remove/qr/:stationId", async (req, res) => {
  const qrValue = req.body.qrValue;
  const stationId = req.params.stationId;
  if (!qrValue || !stationId) {
    return res.status(400).json("QR value and Station ID required!");
  }
  try {
    const foundStation = await Station.findById(stationId);
    if (!foundStation) {
      return res.status(404).json("Station with provided ID not found!");
    }
    foundStation.qrValues = foundStation.qrValues.filter(
      (item) => item.qr !== qrValue
    );
    const savedStation = await foundStation.save();
    res.status(200).json(savedStation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
