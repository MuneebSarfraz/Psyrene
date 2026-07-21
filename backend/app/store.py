"""In-memory data store seeded with demo content matching the UI."""

users = {}  # email -> {id, name, email, password_hash, role}

therapists = [
    {
        "id": 1, "name": "Dr. Sarah Ahmed", "title": "Clinical Psychologist",
        "experience_years": 8, "rating": 4.9, "reviews": 128, "sessions": 340,
        "fee": 2500, "specializations": ["Anxiety", "Depression", "CBT"],
        "bio": "Dr. Ahmed specialises in cognitive-behavioural therapy for anxiety and depression.",
        "availability": ["10:00 AM", "2:00 PM", "4:00 PM", "5:30 PM", "7:00 PM"],
    },
    {
        "id": 2, "name": "Dr. Usman Malik", "title": "Trauma Specialist",
        "experience_years": 10, "rating": 4.8, "reviews": 95, "sessions": 410,
        "fee": 3000, "specializations": ["Trauma", "PTSD", "Mindfulness"],
        "bio": "Dr. Malik focuses on trauma-informed care and mindfulness-based interventions.",
        "availability": ["11:00 AM", "1:00 PM", "3:30 PM"],
    },
    {
        "id": 3, "name": "Dr. Amna Raza", "title": "Counselling Psychologist",
        "experience_years": 6, "rating": 4.7, "reviews": 73, "sessions": 210,
        "fee": 2000, "specializations": ["Relationships", "Self-worth"],
        "bio": "Dr. Raza helps clients build self-worth and healthier relationships.",
        "availability": ["9:00 AM", "12:00 PM", "6:00 PM"],
    },
]

appointments = []  # {id, patient_email, therapist_id, slot, session_type, status}
_next_appt_id = [1]


def next_appt_id():
    i = _next_appt_id[0]
    _next_appt_id[0] += 1
    return i
