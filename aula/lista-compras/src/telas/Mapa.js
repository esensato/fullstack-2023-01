import React from 'react';
import { useEffect, useRef } from 'react';

import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj.js';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Style, Icon} from 'ol/style';
import {Point} from 'ol/geom';

import './Mapa.css';

export const Mapa = (props) => {

    const mapRef = useRef();
    useEffect(() => {
        
        const mapa = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                  source: new OSM({attributions: []})
                })
              ],
              view: new View({
                zoom: 15,
                center: fromLonLat([-46.640096, -23.588201])
              })
        });

        var markers = new VectorLayer({
            source: new VectorSource(),
            style: new Style({
                image: new Icon({
                anchor: [0.5, 1],
                src: 'https://cdn.mapmarker.io/api/v1/pin?text=ESPM&size=50&hoffset=1'
                })
            })
            });

        mapa.addLayer(markers);

        var marker = new Feature(new Point(fromLonLat([-46.640096, -23.588201])));
        marker.setId("ESPM");
        markers.getSource().addFeature(marker);

        mapa.on("click", (event) => {
            console.log(event.coordinate)
            var marker = new Feature(new Point(event.coordinate));
            markers.getSource().addFeature(marker);
            })
        
    }, []);

    console.log("PASSO 2 = ", mapRef.current);

    return <div className='map' ref={mapRef}></div>
}