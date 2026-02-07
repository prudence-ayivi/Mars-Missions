dataSchema = 
[
{
  "id": "unique-string",
  "mission_name": "string",
  "mission_type": "orbital | lander | rover | flyby | helicopter",
  "agency": {
    "name": "string",
    "country": "string",
    "flag": "ISO_CODE"
  },
  "launch": {
    "launch_date": "YYYY-MM-DD",
    "launch_vehicle": "string",
    "launch_site": "string"
  },
  "arrival": {
    "arrival_date": "YYYY-MM-DD",
    "arrival_type": "orbit | landing | flyby",
    "landing_site": {
      "name": "string",
      "latitude": number,
      "longitude": number
    }
  },
  "status": {
    "state": "active | completed | failed | lost | planned",
    "reason": "string"
  },
  "duration": {
    "start": "YYYY-MM-DD",
    "end": "YYYY-MM-DD | null",
    "total_days": number
  },
  "operations": [
    "string",
    "string"
  ],
  "summary": "string",
  "images": [
    "url",
    "url"
  ],
  "space_geometry": {
    "orbital": {
      "semi_major_axis_km": number,
      "eccentricity": number,
      "inclination_deg": number,
      "period_minutes": number
    },
    "surface": {
      "path": [
        { "lat": number, "lon": number }
      ]
    }
  }
}

]
