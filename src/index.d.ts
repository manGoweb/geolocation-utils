declare module 'geolocation-utils' {

  /**
   * Earth's radius in meters
   */
  export const EARTH_RADIUS: number;

  export type LatLon = { lat: number, lon: number }
  export type LatLng = { lat: number, lng: number }
  export type LatitudeLongitude = { latitude: number, longitude: number }
  /**
   * longitude first, latitude second
   */
  export type LonLatTuple = [number, number]
  export type Location = LatLon | LatLng | LatitudeLongitude | LonLatTuple
  export type BoundingBox = { topLeft: Location, bottomRight: Location }
  /**
   * heading in degrees
   * distance in meters
   */
  export type HeadingDistance = { heading: number, distance: number }
  /**
   * location containing longitude and latitude
   * speed in meters per second
   * heading in degrees
   */
  export type LocationHeadingSpeed = { location: Location, speed: number, heading: number }
  /**
   * time in seconds
   * distance in meters
   */
  export type TimeDistance = { time: number, distance: number }

  /**
   * Calculate the average of a list with locations
   * @param {Location[]} locations
   * @return {Location} Returns the average location or null when the list is empty
   *                    Location has the same structure as the first location from
   *                    the input array.
   */
  export function average(locations: Location[]): Location;

  /**
   * Calculate the CPA (closest point of approach) for two tracks
   *
   *     !!!MINT THE UNITS (ALL SI) !!!
   *
   * - Position of the tracks is a longitude/latitude
   * - Speed is in meters per second
   * - Heading is an angle in degrees
   * - Returned time is in seconds
   * - Returned distance is in meters
   *
   * Note: this function calculates a cheap, linear approximation of CPA
   *
   * Source: http://geomalgorithms.com/a07-_distance.html
   *
   * @param {LocationHeadingSpeed} track1
   * @param {LocationHeadingSpeed} track2
   * @return {TimeDistance}  Returns an object with time (s) and distance (m)
   */
  export function cpa(track1: LocationHeadingSpeed, track2: LocationHeadingSpeed): TimeDistance;

  /**
   * Create a location object of a specific type
   * @param {number} latitude
   * @param {number} longitude
   * @param {string} type  Available types: 'LonLatTuple', 'LatLon', 'LatLng', 'LatitudeLongitude'
   */
  export function createLocation(latitude: number, longitude: number, type: string): Location;

  /**
   * Convert an angle in degrees into an angle in radians
   * @param {number} angle   An angle in degrees
   * @return {number} Returns an angle in radians
   */
  export function degToRad(angle: number): number;

  /**
   * Calculate the distance between two locations
   * @param {Location} center
   * @param {Location} location
   * @return {number} Returns the distance in meters
   */
  export function distanceTo(center: Location, location: Location): number;

  /**
   * Get the bounding box of a list with locations
   * @param {Locations[]} locations
   * @param {number} [margin]   Optional margin in meters. Zero by default.
   * @return {BoundingBox} Returns a bounding box described by it's top left
   *                       and bottom right location
   */
  export function getBoundingBox(locations: Location[], margin: number): BoundingBox;

  /**
   * Get the latitude of a location object or array
   * @param {Location} location
   * @return {number} Returns the latitude
   */
  export function getLatitude(location: Location): number;

  /**
   * Get the type of a location object
   * @param {Location} location
   * @return {string} Returns the type of the location object
   *                  Recognized types: 'LonLatTuple', 'LatLon', 'LatLng', 'LatitudeLongitude'
   */
  export function getLocationType(location: Location): string;

  /**
   * Get the longitude of a location
   * @param {Location} location
   * @return {number} Returns the longitude
   */
  export function getLongitude(location: Location): number;

  /**
   * Calculate the heading and distance between two locations
   *
   * Sources:
   *
   *   http://www.movable-type.co.uk/scripts/latlong.html
   *   http://mathforum.org/library/drmath/view/55417.html
   *
   * @param {Location} from   Start location
   * @param {Location} to     End location
   * @return {HeadingDistance}  Returns an object with `heading` in degrees and `distance` in meters
   */
  export function headingDistanceTo(from: Location, to: Location): HeadingDistance;

  /**
   * Calculate the heading from one location to another location
   * @param {Location} center
   * @param {Location} location
   * @return {number} Returns an heading in degrees
   */
  export function headingTo(center: Location, location: Location): number;

  /**
   * Test whether a location lies inside a given bounding box.
   * @param {Location} location
   * @param {BoundingBox} boundingBox
   *            A bounding box containing a top left and bottom right location.
   *            The order doesn't matter.
   * @return {boolean} Returns true when the location is inside the bounding box
   *                   or on the edge.
   */
  export function insideBoundingBox(location: Location, boundingBox: BoundingBox): boolean;

  /**
   * Test whether a location lies inside a circle with certain radius
   * @param {Location} location
   * @param {Location} center
   * @param {number} radius    A radius in meters
   * @return {boolean} Returns true when the location lies inside or
   *                   on the edge of the circle
   */
  export function insideCircle(location: Location, center: Location, radius: number): boolean;

  /**
   * Test whether a location lies inside a given polygon
   * @param {Location} location
   * @param {Location[]} polygon
   * @return {boolean} Returns true when the location is inside the bounding box
   *                   or on the edge.
   */
  export function insidePolygon(location: Location, polygon: Location[]): boolean;

  /**
   * Test whether two locations are equal or approximately equal
   * @param {Location} location1     A location in any of the supported location formats
   * @param {Location} location2     A location in any of the supported location formats
   * @param {number} [epsilon=0]     The maximum absolute difference between the
   *                                 two latitudes and between the two longitudes.
   *                                 Use for example 1e-12 to get rid of round-off errors.
   *                                 The epsilon value itself is included.
   *                                 Optional, default value is 0.
   */
  export function isEqual(location1: Location, location2: Location, epsilon: number): boolean;

  /**
   * Test whether an object is an object containing numeric properties `lat` and `lng`
   * @param {*} object Anything
   * @param {boolean} Returns true when object is of type LatLng
   */
  export function isLatLng(object: any): boolean;

  /**
   * Test whether an object is an object containing numeric properties `lat` and `lon`
   * @param {*} object Anything
   * @param {boolean} Returns true when object is of type LatLon
   */
  export function isLatLon(object: any): boolean;

  /**
   * Test whether an object is an object containing numeric properties `latitude` and `longitude`
   * @param {*} object Anything
   * @param {boolean} Returns true when object is of type LatitudeLongitude
   */
  export function isLatitudeLongitude(object: any): boolean;

  /**
   * Test whether an object is an array containing two numbers (longitude and latitude)
   *
   * IMPORTANT: this function cannot see the difference between an array with lat/lon
   *            or an array with lon/lat numbers. It assumes an order lon/lat.
   *
   * @param {*} object Anything
   * @param {boolean} Returns true when object is of type LonLatTuple
   */
  export function isLonLatTuple(object: any): boolean;

  /**
   * Convert a speed in kilometer per hour into a speed in knots
   * 1 knot is 1.852 kilometer per hour
   * @param {number} kmPerHour   A speed in km/h
   * @return {number} Returns speed in knots
   */
  export function kmPerHourToKnots(kmPerHour: number): number;

  /**
   * Convert a speed in knots into a speed in kilometer per hour
   * 1 knot is 1.852 kilometer per hour
   * @param {number} knots   A speed in knots
   * @return {number} Returns speed in km/h
   */
  export function knotsToKmPerHour(knots: number): number;

  /**
   * Convert a speed in knots into a speed in meter per second
   * 1 knot is 0.514444 m/s
   * @param {number} knots
   * @return {number} Returns speed in m/s
   */
  export function knotsToMeterPerSecond(knots: number): number;

  /**
   * Convert a speed in meter per second into a speed in knots
   * 1 knot is 0.514444 m/s
   * @param {number} knots
   * @return {number} Returns speed in m/s
   */
  export function meterPerSecondToKnots(meterPerSecond: number): number;

  /**
   * Move to a new location from a start location, heading, and distance
   *
   * This is a rough estimation.
   *
   * Source:
   *
   *   http://gis.stackexchange.com/questions/2951/algorithm-for-offsetting-a-latitude-longitude-by-some-amount-of-meters
   *
   * @param {Location} from             Start location
   * @param {HeadingDistance} headingDistance   An object with property `heading` in degrees and `distance` in meters
   * @return {Location} Returns the moved location
   */
  export function moveTo(from: Location, headingDistance: HeadingDistance): Location;

  /**
   * Normalize an heading into the range [0, 360)
   * @param {number} heading   An heading in degrees
   * @return {number} Returns the normalized heading (degrees)
   */
  export function normalizeHeading(heading: number): number;

  /**
   * Normalize a latitude into the range [-90, 90] (upper and lower bound included)
   *
   * See https://stackoverflow.com/questions/13368525/modulus-to-limit-latitude-and-longitude-values
   *
   * @param {number} latitude
   * @return {number} Returns the normalized latitude
   */
  export function normalizeLatitude(latitude: number): number;

  /**
   * Normalize the longitude and latitude of a location.
   * Latitude will be in the range [-90, 90] (upper and lower bound included)
   * Lontitude will be in the range (-180, 180] (lower bound excluded, upper bound included)
   * @param {Location} location
   * @return {Location} Returns the normalized location
   */
  export function normalizeLocation(location: Location): Location;

  /**
   * Normalize a longitude into the range (-180, 180] (lower bound excluded, upper bound included)
   *
   * @param {number} longitude
   * @return {number} Returns the normalized longitude
   */
  export function normalizeLongitude(longitude: number): number;

  /**
   * Convert an angle in radians into an angle in degrees
   * @param {number} angle  An angle in radians
   * @return {number} Returns an angle in degrees
   */
  export function radToDeg(angle: number): number;

  /**
   * Convert a location into an object with properties `lat` and `lng`
   * @param {Location} location
   * @returns {LatLng}
   */
  export function toLatLng(location: Location): LatLng;

  /**
   * Convert a location into an object with properties `lat` and `lon`
   * @param {Location} location
   * @returns {LatLon}
   */
  export function toLatLon(location: Location): LatLon;

  /**
   * Convert a location into an object with properties `latitude` and `longitude`
   * @param {Location} location
   * @returns {LatitudeLongitude}
   */
  export function toLatitudeLongitude(location: Location): LatitudeLongitude;

  /**
   * Convert a location into a tuple `[longitude, latitude]`, as used in the geojson standard
   *
   * Note that for example Leaflet uses a tuple `[latitude, longitude]` instead, be careful!
   *
   * @param {Location} location
   * @returns {LonLatTuple}
   */
  export function toLonLatTuple(location: Location): LonLatTuple;

}
