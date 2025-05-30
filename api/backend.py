import json

def handler(event, context):
    print("🌐  /api/nodes called")          # shows in Vercel logs

    # Allow POST only
    if event.get("httpMethod") != "POST":
        return {
            "statusCode": 405,
            "headers": {"Allow": "POST"},
            "body": json.dumps({"error": "POST required"})
        }

    # Parse JSON body (empty if none)
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return {"statusCode": 400,
                "body": json.dumps({"error": "Invalid JSON"})}

    # Echo back what we received
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"ok": True, "echo": body})
    }    