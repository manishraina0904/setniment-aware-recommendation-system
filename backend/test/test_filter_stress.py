import sys
import os

# Fix: allow Python to find the src folder
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(ROOT)

from src.nlp_intent_filter import analyze_query, is_real_recommendation_query, set_known_brands

set_known_brands([
    "apple","samsung","oneplus","xiaomi","oppo","vivo","realme","motorola",
    "asus","nokia","google","sony","dell","hp","lenovo","acer"
])

TESTS = [

    # ---- BRAND-ONLY ----
    "apple", "iphone", "samsung", "oneplus", "iphon 14", "sumsang phone",

    # ---- BRAND + DEVICE ----
    "apple phone", "samsung smartphone", "oneplus mobile", "xiaomi laptop", "asus gaming laptop",

    # ---- BRAND + FEATURE ----
    "apple phone good camera", "samsung phone long battery",
    "oneplus fast charging", "vivo best selfie camera",

    # ---- DEVICE ONLY ----
    "suggest phone", "need a good laptop", "best smartwatch", "good gaming headphone",

    # ---- FULL SENTENCES ----
    "I want a phone with good battery backup",
    "Can you recommend a laptop for programming?",
    "Which mobile is best under 20000?",
    "Suggest best smartphone with high selfie quality",

    # ---- PRICE QUERIES ----
    "best phone under 15000",
    "good laptop below 50000",
    "phone less than 20000 camera",

    # ---- HINGLISH ----
    "20k ke under best phone",
    "mujhe gaming phone chahiye",
    "battery achi wali mobile suggest karo",
    "apple ka phone batao",

    # ---- TYPOS ----
    "i want a smrtphone",
    "need a laoptop for editing",
    "best camra phone",

    # ---- STRANGE ORDER ----
    "camera good phone recommend",
    "under 20000 phone best which",
    "laptop editing need good",

    # ---- EMOJIS ----
    "suggest phone 😊",
    "best camera mobile 📸",
    "gaming laptop 💻🔥",

    # ---- EMOTIONAL INPUT ----
    "I am very confused please suggest a good phone",
    "I hate my phone recommend a better one",
    "I love photography need camera phone",

    # ---- PARAPHRASED ----
    "Which device should I purchase?",
    "Help me pick a phone",
    "Any good smartphone you suggest?",
    "What mobile do you recommend?",

    # ---- NONSENSE ----
    "hgdhdsjshdj",
    "phone phone phone phone",
    "aaa aaa aaa",
    "asdfghjkl",

    # ---- BLACKLIST ----
    "song lyrics",
    "arijit new song",
    "tell me a joke",
    "whatsapp story",

    # ---- VERY SHORT ----
    "hi",
    "hello",
    "phone?",
    "recommend?",

    # ---- REVERSE BRAND SPELLING ----
    "elppa phone",
    "gnaimsus phone",

    # ---- LONG RANDOM USER INPUT ----
    "Bro please help I want a phone my old one is broken want something good camera battery and under 20000",
    "My sister wants a new mobile but budget is tight suggest something reliable",
]

print("\n=========== STRESS TEST ===========\n")

for text in TESTS:
    a = analyze_query(text)
    accept = is_real_recommendation_query(text)

    print("INPUT:", text)
    print("ACCEPT:", accept)
    print("ANALYSIS:", {
        "corrected": a["corrected"],
        "brands": a["brands"],
        "features": a["features"],
        "semantic": round(a["semantic_score"], 3),
        "zs_score": round(a["zs_score"], 3),
        "rule_pass": a["rule_pass"],
        "meaningful": a["meaningful"]
    })
    print("-" * 60)
