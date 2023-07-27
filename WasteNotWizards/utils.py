# utils.py
import requests

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
