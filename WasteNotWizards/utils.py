# utils.py
import requests
from .models import User, Post

def get_coordinates_from_address(address, access_token):
    base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    response = requests.get(
        f"{base_url}{address}.json",
        params={
            "access_token": access_token,
            "limit": 1,  # Limit the number of results to 1 to get the most relevant match
        },
    )

    if response.ok:
        data = response.json()
        if data.get("features"):
            longitude, latitude = data["features"][0]["center"]
            return latitude, longitude
    return None, None


def geocode_address(address):
    access_token = 'pk.eyJ1IjoiZXhvMzAiLCJhIjoiY2xrY3N0OWsyMGpwaTNnbzE5OWMxaG04ZiJ9.fB0U0vARWrz_Cp-iQxd4tw'
    geocode_url = f'https://api.mapbox.com/geocoding/v5/mapbox.places/{address}.json'
    params = {'access_token': access_token}

    response = requests.get(geocode_url, params=params)
    data = response.json()

    if 'features' in data and data['features']:
        feature = data['features'][0]
        longitude, latitude = feature['geometry']['coordinates']

        return latitude, longitude

    return None, None