# Psyrene — Navigation Map

Back (←) buttons everywhere simply go back (`navigation.goBack()`).

## Auth
| From | Action | To |
|---|---|---|
| Welcome | Get started → | Register |
| Welcome | I already have an account | Login |
| Register | Create account → | Dashboard (reset) |
| Register | Log in | Login |
| Login | **Log in →** | **Dashboard** (reset) |
| Login | Sign up | Register |
| Login | Forgot password? | (stub) |

## Dashboard (Home)
| Element | To |
|---|---|
| Flower avatar (top-right) | Profile |
| Today's check-in | DailyCheckin |
| Rewards | Rewards |
| Dr. Sarah Ahmed **Join** | CallSession |
| This week's mood → View all | Analytics |
| Serenity AI card | AIChat |
| Bottom nav | Home · Progress · Chat · Therapists · Profile |

## Daily Check-in
| Element | To |
|---|---|
| **Save check-in** | Toast "Check-in saved" (1.5s) → Dashboard |

## Analytics (Progress)
Bottom-nav tab. Week/Month toggle is local state.

## AI Chat (Serenity AI)
Reachable from Dashboard card and the Chat bottom-nav tab. Quick-reply chips send messages.

## Therapists
| Element | To |
|---|---|
| Notification icon (top-right) | Notifications |
| Therapist card | TherapistDetail |
| 💚 Apply for NGO support → | FinancialAid |

## Therapist Detail
| Element | To |
|---|---|
| **Book a session** | BookSession |

## Book Session
| Element | To |
|---|---|
| Video Call session-type | CallSession |
| **Confirm booking** | Toast "Booking confirmed" (1.5s) → Dashboard (reset) |

## Call / Live Session
| Element | To |
|---|---|
| ← End early | Dashboard |
| Red end-call button | Dashboard |
| Live timer | ticks up from 00:18:44 |

## Rewards
| Element | To |
|---|---|
| Complete daily check-in → Go | DailyCheckin |
| Finish your daily exercise → Go | Exercises |
| Chat with Serenity AI → Go | AIChat |

## Financial Aid  *(per requested changes)*
| Element | To |
|---|---|
| **Browse subscribed therapists** (replaces "Apply for Aid") | Therapists |
| ~~Browse subsidised~~ | *removed* |

## Notifications
Bottom-nav present. "Mark all read" is a stub.

## Profile  *(per requested changes)*
| Element | To |
|---|---|
| 📄 **My records** (replaces 🎯 Therapy goals) | Records |
| 🔔 Notifications | Notifications |
| 💚 NGO financial aid → Apply | FinancialAid |
| **Sign out** | Welcome (reset) |

## Exercises
Reached from Rewards. Animated 4-7-8 breathing (Start/Pause/Stop). Exercise list is static.

## Records
Reached from Profile and the Records bottom-nav tab (on that screen the 4th tab is Records).
