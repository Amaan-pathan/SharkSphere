import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button.jsx';

const IdeaModal = ({ idea, isOpen, onClose }) => {
  if (!idea) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-bg-secondary border border-border rounded-card max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-border">
                <div className="flex-1 pr-4">
                  <h2 className="text-h2 font-semibold text-text-heading mb-2">
                    {idea.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-card bg-purple-accent flex items-center justify-center text-white text-xs font-bold">
                      {idea.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-heading">
                        {idea.author.name}
                      </div>
                      <div className="text-xs text-text-muted">
                        {new Date(idea.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-card text-text-body hover:text-text-heading hover:bg-bg-primary transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wide">
                      Description
                    </h3>
                    <p className="text-body text-text-body leading-relaxed whitespace-pre-wrap">
                      {idea.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-sm font-semibold text-text-muted mb-1">Upvotes</div>
                        <div className="text-h3 font-semibold text-purple-accent">
                          {idea.votes?.upvotes || 0}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-text-muted mb-1">Total Votes</div>
                        <div className="text-h3 font-semibold text-text-heading">
                          {idea.votes?.total || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border">
                <Button onClick={onClose} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default IdeaModal;

