'use client';

interface ProjectFilterProps {
    activeType: string;
    onTypeChange: (type: string) => void;
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const types = ['Eaton', 'Personal'];
const categories = ['All', 'Firmware', 'IoT', 'DevOps'];

export default function ProjectFilter({
    activeType,
    onTypeChange,
    activeCategory,
    onCategoryChange
}: ProjectFilterProps) {
    return (
        <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Type Dropdown/Toggle */}
            <div>
                <label className="block text-sm text-foreground-secondary mb-2 terminal-text">
                    <span className="text-primary">$</span> filter --type
                </label>
                <div className="flex bg-surface border border-border rounded-lg p-1">
                    {types.map((type) => (
                        <button
                            key={type}
                            onClick={() => onTypeChange(type)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeType === type
                                    ? 'bg-primary/20 text-primary shadow-sm'
                                    : 'text-foreground-secondary hover:text-foreground'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div>
                <label className="block text-sm text-foreground-secondary mb-2 terminal-text">
                    <span className="text-secondary">$</span> filter --category
                </label>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`px-3 py-2 rounded-md text-sm transition-all border ${activeCategory === category
                                    ? 'bg-secondary/20 border-secondary text-secondary'
                                    : 'bg-surface border-border text-foreground-secondary hover:border-secondary/50'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
