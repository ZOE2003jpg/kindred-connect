import { motion } from "framer-motion";
import medicalDirectorNew from "@/assets/medical-director-new.jpg";
import hospitalDirectorNew from "@/assets/hospital-director-new.jpg";

const leadership = [
  {
    name: "Kalu Olua",
    title: "Managing Director",
    description: "Leading our medical team with excellence and dedication to patient care.",
    image: medicalDirectorNew,
  },
  {
    name: "Kemi Olua",
    title: "Hospital Director",
    description: "Overseeing hospital operations and ensuring the highest standards of healthcare delivery.",
    image: hospitalDirectorNew,
  },
];

const LeadershipSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <span className="text-sm text-primary font-medium">Our Leadership</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Our <span className="text-[hsl(217,91%,60%)]">Leadership</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dedicated leaders committed to excellence in healthcare delivery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {leadership.map((leader, index) => (
            <motion.div
              key={leader.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-1">{leader.name}</h3>
                <p className="text-primary font-medium mb-3">{leader.title}</p>
                <p className="text-sm text-muted-foreground">{leader.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
