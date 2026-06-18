"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from "./RSVP.module.css";

const EVENTS = ["Haldi", "Mehendi", "Sangeet", "Engagement", "Pheras", "Reception"];
const DIETARY = ["Veg", "Non-Veg", "Jain"];

interface FormState {
  name: string;
  attending: boolean | null;
  partySize: number;
  events: string[];
  dietary: string;
  wishes: string;
  message: string;
}

const initialState: FormState = {
  name: "", attending: null, partySize: 1,
  events: [], dietary: "Veg", wishes: "", message: "",
};

export default function RSVPForm() {
  const [form, setForm]         = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const toggleEvent = (e: string) => {
    setForm(f => ({
      ...f,
      events: f.events.includes(e)
        ? f.events.filter(x => x !== e)
        : [...f.events, e],
    }));
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (form.attending === null) { setError("Please let us know if you're attending."); return; }
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "rsvps"), {
        ...form,
        submittedAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`section ${styles.section}`} id="rsvp">
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Will You Join Us?
      </motion.h2>

      <motion.p
        className={styles.subheading}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Your presence would mean the world to us
      </motion.p>

      <motion.div
        className={styles.formCard}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className={styles.success}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className={styles.successIcon}>🎉</span>
              <h3 className={styles.successTitle}>
                {form.attending ? "See you there!" : "We&apos;ll miss you!"}
              </h3>
              <p className={styles.successMsg}>
                {form.attending
                  ? "We can't wait to celebrate with you. Your RSVP has been received!"
                  : "Thank you for letting us know. We'll celebrate with you another time!"}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Name */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="rsvp-name">Your Full Name</label>
                <input
                  id="rsvp-name"
                  className={styles.input}
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>

              {/* Attending */}
              <div className={styles.field}>
                <label className={styles.label}>Will you be attending?</label>
                <div className={styles.toggleRow}>
                  <button
                    type="button"
                    id="rsvp-attending-yes"
                    className={`${styles.toggleBtn} ${form.attending === true ? styles.active : ""}`}
                    onClick={() => setForm(f => ({ ...f, attending: true }))}
                  >
                    🎉 Joyfully Accept
                  </button>
                  <button
                    type="button"
                    id="rsvp-attending-no"
                    className={`${styles.toggleBtn} ${form.attending === false ? styles.active : ""}`}
                    onClick={() => setForm(f => ({ ...f, attending: false }))}
                  >
                    😢 Regretfully Decline
                  </button>
                </div>
              </div>

              {form.attending && (
                <>
                  {/* Party size */}
                  <div className={styles.field}>
                    <label className={styles.label}>Number of Guests</label>
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        className={styles.stepBtn}
                        onClick={() => setForm(f => ({ ...f, partySize: Math.max(1, f.partySize - 1) }))}
                      >−</button>
                      <span className={styles.stepValue}>{form.partySize}</span>
                      <button
                        type="button"
                        className={styles.stepBtn}
                        onClick={() => setForm(f => ({ ...f, partySize: Math.min(10, f.partySize + 1) }))}
                      >+</button>
                    </div>
                  </div>

                  {/* Events */}
                  <div className={styles.field}>
                    <label className={styles.label}>Events You&apos;ll Attend</label>
                    <div className={styles.checkboxGroup}>
                      {EVENTS.map(ev => (
                        <label key={ev} className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={form.events.includes(ev)}
                            onChange={() => toggleEvent(ev)}
                          />
                          {ev}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Dietary */}
                  <div className={styles.field}>
                    <label className={styles.label}>Dietary Preference</label>
                    <div className={styles.dietaryRow}>
                      {DIETARY.map(d => (
                        <button
                          key={d}
                          type="button"
                          className={`${styles.dietBtn} ${form.dietary === d ? styles.active : ""}`}
                          onClick={() => setForm(f => ({ ...f, dietary: d }))}
                        >
                          {d === "Veg" ? "🌿" : d === "Non-Veg" ? "🍗" : "🙏"} {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Wishes */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="rsvp-wishes">Advice & Wishes</label>
                <textarea
                  id="rsvp-wishes"
                  className={styles.textarea}
                  placeholder="Share your blessings and advice for the couple…"
                  value={form.wishes}
                  onChange={e => setForm(f => ({ ...f, wishes: e.target.value }))}
                />
              </div>

              {/* Message */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="rsvp-message">Message for the Couple</label>
                <textarea
                  id="rsvp-message"
                  className={styles.textarea}
                  placeholder="Write something special for the bride & groom…"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button
                type="submit"
                id="rsvp-submit-btn"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? "Sending… 🙏" : "Send My RSVP 💌"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
