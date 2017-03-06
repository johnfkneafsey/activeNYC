export const findNearest = (facilities, userLat, userLong, results ) =>  {
    let varianceArray = [ ];
    for (let i = 0; i < facilities.length; i++) {
        let locationVariance = Math.abs(userLat - Number(facilities[i].lat)) + Math.abs(userLong - Number(facilities[i].lon));
        let locationObj = {
          Prop_ID: facilities[i].Prop_ID,
          Name: facilities[i].Name,
          Location: facilities[i].Location,
          Accessible: facilities[i].Accessible,
          lat: Number(facilities[i].lat),
          lon: Number(facilities[i].lon), 
          locationVariance: locationVariance
          };
        varianceArray.push(locationObj);
    }
    return varianceArray.sort(function(obj1, obj2) {
        return obj1.locationVariance -  obj2.locationVariance;
    }).slice(0, results)
}

