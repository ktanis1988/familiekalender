import React from "react";

function ActivityCard({ activity, right }) {
    return (
        <div className="activity-card">
            <div className="activity-info">
                <h3>{activity.title}</h3>

                {activity.time && <p className="activity-time">{activity.time}</p>}

                {activity.description && <p className="activity-description">{activity.description}</p>}
                {activity.category && <span className="activity-category">{activity.category}</span>}
                {activity.assignedTo && <p className="activity-assigned">Voor:{activity.assignedTo}</p>}
                {activity.urgent && <span className="urgent-badge">Urgent</span>}
            </div>

            {right}
        </div>
    );
}

export default ActivityCard;