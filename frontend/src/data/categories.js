// Single source for product categories: /products, /products/:slug, the home
// carousel and the state pages all read from here. Item lists follow the
// 2026 catalogue (public/Swecha_Enterprises_Catalogue_2026.pdf) — don't add
// equipment here that we don't actually supply.
export const categories = [
  {
    slug: 'therapeutic-modalities',
    name: 'Therapeutic Modalities',
    image: '/images/category-therapeutic-modalities.webp',
    hero: '/images/hero-knee-treatment.webp',
    summary: 'Ultrasound, TENS, laser therapy, and electrotherapy',
    title: 'Shockwave, Laser, Tecar & Electrotherapy Machines',
    description: 'Physiotherapy electrotherapy equipment — shockwave therapy, Class 3B/4 laser, tecar, combination ultrasound & electrotherapy, magnetic therapy, TENS and diathermy. Supplied across Andhra Pradesh and Telangana.',
    intro: 'Physical medicine modalities are the pain-management backbone of a physiotherapy department. We supply shockwave, laser, tecar, magnetic and combination electrotherapy–ultrasound units for hospitals, rehabilitation centres and clinics, sized to your case mix and budget.',
    items: [
      { name: 'Combination therapy devices (ultrasound & electrotherapy)', desc: 'Therapeutic ultrasound and multiple electrotherapy currents in one unit — a practical first device for a new department.' },
      { name: 'Shockwave therapy', desc: 'Radial shockwave units used in musculoskeletal and sports physiotherapy for conditions such as tendinopathies and plantar fasciitis.' },
      { name: 'High-power laser devices', desc: 'Class 4 laser therapy systems for deeper tissue treatment in pain and soft-tissue rehabilitation.' },
      { name: 'Low power laser devices', desc: 'Class 3B laser units for superficial tissue and point treatments.' },
      { name: 'Tecar therapy', desc: 'Capacitive and resistive radiofrequency diathermy for deep-tissue heating.' },
      { name: 'Magnetic therapy', desc: 'Pulsed electromagnetic field units used alongside other modalities in pain management.' },
      { name: 'Diathermy', desc: 'Shortwave and radiofrequency diathermy for therapeutic heating.' },
      { name: 'TENS Units', desc: 'Transcutaneous electrical nerve stimulation for clinic and take-home pain management.' },
      { name: 'Lymphedema Pump', desc: 'Sequential pneumatic compression for lymphedema and oedema management.' },
    ]
  },
  {
    slug: 'exercise-therapy',
    name: 'Exercise Therapy',
    image: '/images/category-exercise-therapy.webp',
    hero: '/images/hero-movement-therapy-room.webp',
    summary: 'Resistance training and functional movement equipment',
    title: 'Exercise Therapy & Gym Equipment for Physiotherapy Departments',
    description: 'Parallel bars, staircase climbers, quadriceps benches, active/passive cycles, resistance and functional training equipment for physiotherapy and rehab gyms in Andhra Pradesh and Telangana.',
    intro: 'Everything a rehabilitation gym needs to take patients from supported exercise to independent strength and function.',
    items: [
      { name: 'Parallel bars', desc: 'Height- and width-adjustable bars for early standing and gait practice.' },
      { name: 'Staircase climbers', desc: 'Training staircases for stair negotiation before discharge.' },
      { name: 'Quadriceps benches', desc: 'Loaded knee-extension benches for lower-limb strengthening.' },
      { name: 'Active/passive cycles', desc: 'Motor-assisted cycles for upper and lower limbs, usable from passive to fully active training.' },
      { name: 'Resistance Training Equipment', desc: 'Graded resistance for progressive strengthening.' },
      { name: 'Functional Movement Systems', desc: 'Equipment for task-specific and functional training.' },
      { name: 'Therapeutic Exercise Bikes', desc: 'Low-impact cardiovascular and range-of-motion training.' },
      { name: 'Pulleys & Weights', desc: 'Wall pulleys and weight sets for strengthening programmes.' },
    ]
  },
  {
    slug: 'treatment-tables',
    name: 'Treatment Tables',
    image: '/images/category-treatment-tables.webp',
    hero: '/images/hero-electric-treatment-table.webp',
    summary: 'Adjustable tables for optimal patient positioning',
    title: 'Physiotherapy Treatment Tables — Electric, Bobath, Tilt & Decompression',
    description: 'Electric hi-lo, 3-section, Bobath, tilt, manipulation, traction and 3D cervical & lumbar decompression tables for physiotherapy departments in Andhra Pradesh and Telangana.',
    intro: 'Treatment tables are the equipment a physiotherapy floor runs on every day. We supply them sized and finished to match your treatment rooms — from a single electric couch for a clinic to a full set for a hospital department.',
    items: [
      { name: 'Electric Hi-Lo Tables', desc: 'Motorised height adjustment, including 3-section designs, so therapists work at the right height and patients transfer safely.' },
      { name: '3D cervical & lumbar decompression tables', desc: 'Motorised spinal decompression and traction tables for cervical and lumbar programmes.' },
      { name: 'Bobath Table', desc: 'Wide, stable platforms for neuro-rehabilitation and paediatric therapy.' },
      { name: 'Tilt Tables', desc: 'Gradual verticalisation for patients who cannot yet stand independently.' },
      { name: 'Manual Therapy Tables', desc: 'Manipulation and mobilisation tables with sectional adjustment.' },
      { name: 'Traction Tables', desc: 'Tables built for cervical and lumbar traction set-ups.' },
      { name: 'Examination Couches', desc: 'Fixed-height couches for assessment and consultation rooms.' },
    ]
  },
  {
    slug: 'hydrotherapy',
    name: 'Hydrotherapy',
    image: '/images/category-hydrotherapy.webp',
    hero: '/images/hero-hydrotherapy-tub.webp',
    summary: 'Whirlpool tubs and aquatic therapy systems',
    title: 'Hydrotherapy Equipment — Whirlpool Tubs & Aquatic Therapy',
    description: 'Whirlpool tubs, aquatic therapy pools, underwater treadmills and contrast baths for rehabilitation centres in Andhra Pradesh and Telangana.',
    intro: 'Water-based rehabilitation equipment for centres adding aquatic therapy, from single whirlpool units to full aquatic therapy set-ups.',
    items: [
      { name: 'Whirlpool Tubs', desc: 'Upper- and lower-limb whirlpool baths.' },
      { name: 'Aquatic Therapy Pools', desc: 'Pools for water-based exercise and rehabilitation.' },
      { name: 'Underwater Treadmills', desc: 'Buoyancy-supported gait and exercise training.' },
      { name: 'Hydrotherapy Jets', desc: 'Jet systems for water-based massage and resistance.' },
      { name: 'Contrast Baths', desc: 'Paired hot and cold baths.' },
    ]
  },
  {
    slug: 'interactive-fitness',
    name: 'Interactive Fitness Equipment',
    image: '/images/category-interactive-fitness.webp',
    hero: '/images/hero-touchscreen-interface.webp',
    summary: 'Smart treadmills, bikes, and digital training systems',
    title: 'Interactive & Game-Based Rehabilitation Equipment',
    description: 'Game-based exercise therapy, VR rehabilitation systems, smart treadmills and digital training bikes for rehabilitation centres in Andhra Pradesh and Telangana.',
    intro: 'Game-based and digital rehabilitation systems that keep patients engaged through repetitive therapy and give clinicians progress data they can act on.',
    items: [
      { name: 'Gamified Exercise Platforms', desc: 'Game-based exercise therapy for upper limb, lower limb and balance.' },
      { name: 'Virtual Reality Rehab Systems', desc: 'Immersive task-based rehabilitation.' },
      { name: 'Smart Treadmills', desc: 'Treadmills with training programmes and session data.' },
      { name: 'Digital Training Bikes', desc: 'Cycles with interactive programmes and tracking.' },
    ]
  },
  {
    slug: 'kinesiotherapy',
    name: 'Kinesiotherapy',
    image: '/images/category-kinesiotherapy.webp',
    hero: '/images/hero-suspension-cage.webp',
    summary: 'Movement therapy and rehabilitation tools',
    title: 'Neuro-Rehab, Balance & Patient Mobility Equipment',
    description: 'Patient lifters, sit-to-stand and transfer aids, walkers, CPM machines, suspension therapy, hand rehab, balance assessment and gait trainers for neuro-rehabilitation in Andhra Pradesh and Telangana.',
    intro: 'For patients moving from first mobilisation through to independent movement — patient handling, supported movement, balance and gait equipment for neuro and orthopaedic rehabilitation.',
    items: [
      { name: 'Patient lifters & hoists', desc: 'Safe transfers for dependent patients, reducing handling load on staff.' },
      { name: 'Sit-to-stand & transfer aids', desc: 'Assisted standing and bed-to-chair transfer.' },
      { name: 'Walkers', desc: 'Walking aids for supported ambulation.' },
      { name: 'Suspension Therapy Systems', desc: 'Load-free suspension mobilisation using a suspension frame.' },
      { name: 'CPM Machines', desc: 'Continuous passive motion for post-operative joint mobilisation.' },
      { name: 'Hand rehabilitation devices', desc: 'Hand rehab systems supporting all-finger motion.' },
      { name: 'Balance assessment & training', desc: 'Balance platforms with measurement and training modes.' },
      { name: 'Gait Trainers', desc: 'Supported gait practice for neurological and orthopaedic patients.' },
      { name: 'Therapy Ladders', desc: 'Finger and shoulder ladders for range-of-motion exercise.' },
    ]
  },
  {
    slug: 'contrast-therapy',
    name: 'Contrast Therapy (Hot & Cold)',
    image: '/images/category-contrast-therapy.webp',
    summary: 'Hot packs, cold therapy, and contrast bath systems',
    title: 'Hot & Cold Therapy Equipment — Cryo-Compression, Hot Packs, Paraffin',
    description: 'Cryo-compression, contrast (hot/cold) therapy units, hot pack units, paraffin wax baths and cryotherapy devices for physiotherapy departments in Andhra Pradesh and Telangana.',
    intro: 'Thermal therapy for post-operative inflammation and swelling and everyday musculoskeletal care — from hot pack units for a clinic to cryo-compression for orthopaedic and sports rehab.',
    items: [
      { name: 'Cryo-compression', desc: 'Combined cold and intermittent compression, widely used after orthopaedic surgery.' },
      { name: 'Contrast Bath Units', desc: 'Alternating hot and cold therapy in one system.' },
      { name: 'Hot Pack Units', desc: 'Heated storage units for moist hot packs.' },
      { name: 'Paraffin Wax Baths', desc: 'Paraffin heat therapy for hands and feet.' },
      { name: 'Cold Therapy Systems', desc: 'Cold pack chillers and cold therapy units.' },
      { name: 'Cryotherapy Devices', desc: 'Localised cryotherapy units.' },
    ]
  },
  {
    slug: 'robotic-rehabilitation',
    name: 'Advanced Robotic Systems',
    image: '/images/category-robotic-systems.webp',
    hero: '/images/hero-robotic-gait-trainer.webp',
    isLarge: true,
    summary: 'Robotic-assisted therapy and rehabilitation technology',
    title: 'Robotic Rehabilitation — Gait Trainers, Exoskeletons & Upper-Limb Robotics',
    description: 'Robot-assisted gait trainers, robotic exoskeletons, upper-limb robotic devices and sensor-based feedback systems for neuro-rehabilitation centres in Andhra Pradesh and Telangana.',
    intro: 'Robotic systems for neuro-rehabilitation centres treating stroke, spinal cord injury and other neurological conditions — high-repetition therapy with real-time progress data. These are centre-level investments, so we start with a conversation about your patient volume, space and staffing.',
    items: [
      { name: 'Robot-Assisted Gait Trainers', desc: 'Body-weight-supported robotic gait training.' },
      { name: 'Robotic Exoskeletons', desc: 'Wearable robotic systems for assisted walking.' },
      { name: 'Upper Limb Robotic Devices', desc: 'Robotic arm and hand rehabilitation.' },
      { name: 'Sensor-Based Feedback Systems', desc: 'Measurement and biofeedback for tracking patient progress.' },
    ],
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
