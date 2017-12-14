Add the following to hosting section of firebase.json after running
firebase init

```
    "rewrites": [
      {
        "source": "/hooks/ifttt",
        "function": "iftttSample"
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
```

Then go to your firebase route:
/hooks/ifttt

This will create an item inside your task queue for raspberri pi to eventually consume.