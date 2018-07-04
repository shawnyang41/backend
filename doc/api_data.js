define({ "api": [
  {
    "type": "post",
    "url": "/createDevice",
    "title": "Create/Store Device Entry",
    "name": "createDevice",
    "group": "Device",
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -XPOST -H \"Content-type: application/json\" -d \n     \"{\n\t      \"DeviceID\" : 119,\n\t      \"DeviceName\" : \"IphoneX\",\n\t      \"BatteryStatus\" : \"100\",\n\t      \"Longitude\" : \"12\",\n\t      \"Latitude\" : \"444\"\n     }\" \n     'localhost:3000/createDevice'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DuplicatedID",
            "description": "<p>ID has been added in database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingFields",
            "description": "<p>Request is incomplete.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"DuplicatedID\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"MissingFields\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "/deviceLookup",
    "title": "Look up Device Entry",
    "name": "deviceLookup",
    "group": "Device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Device's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XGET 'localhost:3000/deviceLookup?id=14'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "DeviceID",
            "description": "<p>Device's Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "DeviceName",
            "description": "<p>Device's Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "BatteryStatus",
            "description": "<p>Battery's Status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Longitude",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Latitude",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "TIMESTEMP",
            "description": "<p>Time of insertion</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n      {\n\t        \"DeviceID\": 119,\n\t        \"DeviceName\": \"Shawn's iphone\",\n\t        \"BatteryStatus\": \"100\",\n\t        \"Longitude\": \"12\",\n\t        \"Latitude\": \"444\",\n\t        \"TIMESTEMP\": 1530735371841\n      }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IDNotFound",
            "description": "<p>ID does not exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"IDNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app.js",
    "groupTitle": "Device"
  }
] });
