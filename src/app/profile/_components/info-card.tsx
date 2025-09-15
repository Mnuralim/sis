interface Props {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
  className?: string;
}
export const InfoCard = ({
  icon: Icon,
  title,
  content,
  className = "",
}: Props) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300 ${className}`}
  >
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  </div>
);
