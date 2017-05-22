
export const DATA_STYLING = {
    id: 'geojson-layer',
    filled: true,
    stroked: false,
    extruded: false,
    opacity: APP_CONFIG.opacity,
    getFillColor: () => APP_CONFIG.geoColor,
    getElevation: () => APP_CONFIG.elevation,
    getLineColor: () => APP_CONFIG.geoColor,
    getLineWidth: () => APP_CONFIG.lineWidth,
    getRadius: () => APP_CONFIG.pointRadius
};

export default DATA_STYLING;
