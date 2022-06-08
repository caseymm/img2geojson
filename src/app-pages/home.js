import React from 'react';
import { Component } from 'react';
// import { Link } from "react-router-dom";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import * as turf from '@turf/turf';
import Dropzone from '../app-components/dropzone'
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import FreehandMode from 'mapbox-gl-draw-freehand-mode'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -98.78320225360663,
      lat: 40.45646421496375, 
      zoom: 3.5,
      mapOpacity: .5,
      imageOpacity: .5
    };
    this.mapContainer = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/caseymmiler/cl45xkrmg000714loppfn16v6',
      center: [lng, lat],
      zoom: zoom
    });

    const scale = new mapboxgl.ScaleControl({
      maxWidth: 150,
      unit: 'imperial'
    });
    this.map.addControl(scale);
    scale.setUnit('imperial');

    this.Draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        line_string: true,
        trash: true
      },
      modes: Object.assign(MapboxDraw.modes, {
        draw_polygon: FreehandMode
      }),
      styles: [
        {
          'id': 'gl-draw-polygon-fill-inactive',
          'type': 'fill',
          'filter': ['all', ['==', 'active', 'false'],
              ['==', '$type', 'Polygon'],
              ['!=', 'mode', 'static']
          ],
          'paint': {
              'fill-color': '#3bb2d0',
              'fill-outline-color': '#3bb2d0',
              'fill-opacity': 0.2
          }
      },
      {
          'id': 'gl-draw-polygon-fill-active',
          'type': 'fill',
          'filter': ['all', ['==', 'active', 'true'],
              ['==', '$type', 'Polygon']
          ],
          'paint': {
              'fill-color': '#fbb03b',
              'fill-outline-color': '#fbb03b',
              'fill-opacity': 0.2
          }
      },
      {
          'id': 'gl-draw-polygon-midpoint',
          'type': 'circle',
          'filter': ['all', ['==', '$type', 'Point'],
              ['==', 'meta', 'midpoint']
          ],
          'paint': {
              'circle-radius': 3,
              'circle-color': '#fbb03b'
          }
      },
      {
          'id': 'gl-draw-polygon-stroke-inactive',
          'type': 'line',
          'filter': ['all', ['==', 'active', 'false'],
              ['==', '$type', 'Polygon'],
              ['!=', 'mode', 'static']
          ],
          'layout': {
              'line-cap': 'round',
              'line-join': 'round'
          },
          'paint': {
              'line-color': '#3bb2d0',
              'line-width': 4
          }
      },
      {
          'id': 'gl-draw-polygon-stroke-active',
          'type': 'line',
          'filter': ['all', ['==', 'active', 'true'],
              ['==', '$type', 'Polygon']
          ],
          'layout': {
              'line-cap': 'round',
              'line-join': 'round'
          },
          'paint': {
              'line-color': '#fbb03b',
              'line-dasharray': [0.2, 2],
              'line-width': 4
          }
      },
      {
          'id': 'gl-draw-line-inactive',
          'type': 'line',
          'filter': ['all', ['==', 'active', 'false'],
              ['==', '$type', 'LineString'],
              ['!=', 'mode', 'static']
          ],
          'layout': {
              'line-cap': 'round',
              'line-join': 'round'
          },
          'paint': {
              'line-color': '#3bb2d0',
              'line-width': 4
          }
      },
      {
          'id': 'gl-draw-line-active',
          'type': 'line',
          'filter': ['all', ['==', '$type', 'LineString'],
              ['==', 'active', 'true']
          ],
          'layout': {
              'line-cap': 'round',
              'line-join': 'round'
          },
          'paint': {
              'line-color': '#fbb03b',
              'line-dasharray': [0.2, 2],
              'line-width': 4
          }
      },
      {
          'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
          'type': 'circle',
          'filter': ['all', ['==', 'meta', 'vertex'],
              ['==', '$type', 'Point'],
              ['!=', 'mode', 'static']
          ],
          'paint': {
              'circle-radius': 5,
              'circle-color': '#fff'
          }
      },
      {
          'id': 'gl-draw-polygon-and-line-vertex-inactive',
          'type': 'circle',
          'filter': ['all', ['==', 'meta', 'vertex'],
              ['==', '$type', 'Point'],
              ['!=', 'mode', 'static']
          ],
          'paint': {
              'circle-radius': 3,
              'circle-color': '#fbb03b'
          }
      },
      {
          'id': 'gl-draw-point-point-stroke-inactive',
          'type': 'circle',
          'filter': ['all', ['==', 'active', 'false'],
              ['==', '$type', 'Point'],
              ['==', 'meta', 'feature'],
              ['!=', 'mode', 'static']
          ],
          'paint': {
              'circle-radius': 5,
              'circle-opacity': 1,
              'circle-color': '#fff'
          }
      },
      {
          'id': 'gl-draw-point-inactive',
          'type': 'circle',
          'filter': ['all', ['==', 'active', 'false'],
              ['==', '$type', 'Point'],
              ['==', 'meta', 'feature'],
              ['!=', 'mode', 'static']
          ],
          'paint': {
              'circle-radius': 3,
              'circle-color': '#3bb2d0'
          }
      },
      {
          'id': 'gl-draw-point-stroke-active',
          'type': 'circle',
          'filter': ['all', ['==', '$type', 'Point'],
              ['==', 'active', 'true'],
              ['!=', 'meta', 'midpoint']
          ],
          'paint': {
              'circle-radius': 7,
              'circle-color': '#fff'
          }
      },
      {
          'id': 'gl-draw-point-active',
          'type': 'circle',
          'filter': ['all', ['==', '$type', 'Point'],
              ['!=', 'meta', 'midpoint'],
              ['==', 'active', 'true']
          ],
          'paint': {
              'circle-radius': 5,
              'circle-color': '#fbb03b'
          }
      },
      {
          'id': 'gl-draw-polygon-fill-static',
          'type': 'fill',
          'filter': ['all', ['==', 'mode', 'static'],
              ['==', '$type', 'Polygon']
          ],
          'paint': {
              'fill-color': '#404040',
              'fill-outline-color': '#404040',
              'fill-opacity': 0.2
          }
      },
      {
          'id': 'gl-draw-polygon-stroke-static',
          'type': 'line',
          'filter': ['all', ['==', 'mode', 'static'],
              ['==', '$type', 'Polygon']
          ],
          'layout': {
              'line-cap': 'round',
              'line-join': 'round'
          },
          'paint': {
              'line-color': '#404040',
              'line-width': 4
          }
      },
      {
          'id': 'gl-draw-line-static',
          'type': 'line',
          'filter': ['all', ['==', 'mode', 'static'],
              ['==', '$type', 'LineString']
          ],
          'layout': {
              'line-cap': 'round',
              'line-join': 'round'
          },
          'paint': {
              'line-color': '#404040',
              'line-width': 4
          }
      }
      ]
    });
    this.map.addControl(this.Draw, 'top-left');
  }

  handleChange(event) {
    // console.log(event.target.className)
    this.setState({
      [event.target.name]: event.target.value
    });
    if(event.target.name === 'mapOpacity'){
      let mapOpacity = document.querySelector(".mapboxgl-canvas");
      mapOpacity.style.opacity = event.target.value;
    }
    if(event.target.name === 'imageOpacity'){
      let imageOpacity = document.querySelector(".droppedImage");
      imageOpacity.style.opacity = event.target.value;
    }
  }

  render() {
    const lockMap = () => {
      console.log('click lock')
      this.map.boxZoom.disable();
      this.map.scrollZoom.disable();
      // this.map.dragPan.disable();
      // this.map.dragRotate.disable();
      // this.map.keyboard.disable();
      this.map.doubleClickZoom.disable();
      this.map.touchZoomRotate.disable();
    }

    const unlockMap = () => {
      console.log('click unlock')
      this.map.boxZoom.enable();
      this.map.scrollZoom.enable();
      // this.map.dragPan.enable();
      // this.map.dragRotate.enable();
      // this.map.keyboard.enable();
      this.map.doubleClickZoom.enable();
      this.map.touchZoomRotate.enable();
    }

    const setBlankStyle = () => {
      this.map.setStyle('mapbox://styles/caseymmiler/cl466jhd2000515o4sqpaul44');
      let blankStyle = document.querySelector(".mapboxgl-canvas");
      blankStyle.style.opacity = "1";
    }
    const resetStyle = () => {
      this.map.setStyle('mapbox://styles/caseymmiler/cl45xkrmg000714loppfn16v6');
    }

    const downloadGeoJSON = () => {
      // console.log(this.Draw.getAll());
      const data = this.Draw.getAll();
      if (data.features.length > 0) {
          // Stringify the GeoJson
          var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

          // Create export
          document.getElementById('export').setAttribute('href', 'data:' + convertedData);
          document.getElementById('export').setAttribute('download','data.geojson');
          document.getElementById('export').click();
      } else {
          alert("Nothing to export");
      }
    }

    return (
      <div>
        <Dropzone />
        <div ref={this.mapContainer} className="map-container" />
        <div className="buttons">
          <button onClick={() => lockMap()}>lock zoom</button>
          <button onClick={() => unlockMap()}>unlock zoom</button>
          <button onClick={() => setBlankStyle()}>set blank style</button>
          <button onClick={() => resetStyle()}>reset style</button>
          <button onClick={() => downloadGeoJSON()}>download GeoJSON</button>
          <a id="export">file</a>
          <label>
            <div style={{'position': 'relative'}}>
              Map Opacity:
              <div className="range-label">{this.state.mapOpacity}</div>
            </div>
            <input type="range" className="range" name="mapOpacity" min="0" max="1" step=".01" value={this.state.mapOpacity} onChange={this.handleChange}></input>
          </label>
          <label>
            <div style={{'position': 'relative'}}>
              Image Opacity:
              <div className="range-label">{this.state.imageOpacity}</div>
            </div>
            <input type="range" className="range" name="imageOpacity" min="0" max="1" step=".01" value={this.state.imageOpacity} onChange={this.handleChange}></input>
          </label>
        </div>
      </div>
    );
  }
}

const Home = (props) => {
   return(
    <Map />
   )
}
 
export default Home;