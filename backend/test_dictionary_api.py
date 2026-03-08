import requests

# =========================================================
# 🧠 API Ninjas Thesaurus API Test
# ---------------------------------------------------------
# This test checks if your API key works properly.
# Replace 'word' with anything you'd like to test.
# =========================================================

API_KEY = "W+EJAKSChItBmzsUVLF6xg==v7nzSdGgFw0JopVP"
word = "phone"

url = f"https://api.api-ninjas.com/v1/thesaurus?word={word}"
headers = {"X-Api-Key": API_KEY}

print(f"🔍 Testing API Ninjas Dictionary for the word: '{word}' ...")

try:
    response = requests.get(url, headers=headers, timeout=10)

    if response.status_code == 200:
        data = response.json()
        synonyms = data.get("synonyms", [])
        antonyms = data.get("antonyms", [])
        if synonyms:
            print("✅ API connection successful!")
            print(f"🧠 Synonyms for '{word}': {synonyms[:5]}")
        else:
            print(f"⚠️ No synonyms found for '{word}'.")
        if antonyms:
            print(f"🔁 Antonyms: {antonyms[:5]}")
    elif response.status_code == 403:
        print("❌ Invalid or unauthorized API key. Check your API Ninjas dashboard.")
    elif response.status_code == 429:
        print("⚠️ Rate limit exceeded. Try again later.")
    else:
        print(f"❌ API returned status code {response.status_code}")
        print(response.text)
except Exception as e:
    print(f"⚠️ Error connecting to API Ninjas: {e}")
