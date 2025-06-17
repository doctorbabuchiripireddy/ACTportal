import React, { useState } from "react";
import { useIncidents } from "../../context/IncidentContext";
import { IncidentCard } from "./IncidentCard";
import { IncidentForm } from "./IncidentForm";
import { Badge } from "../Shared/Badge";
import { Button } from "../Shared/Button";
import { Search, Filter, Plus } from "lucide-react";

export function IncidentList() {
  const { state } = useIncidents();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showIncidentForm, setShowIncidentForm] = useState(false);

  const filteredIncidents = state.incidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || incident.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || incident.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Active Incidents</h2>
          <p className="text-slate-400">
            Monitor and manage warehouse incidents across all facilities
          </p>
        </div>
        <Button
          onClick={() => setShowIncidentForm(true)}
          variant="primary"
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Report Incident</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search incidents by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="all" className="bg-slate-800">
                  All Status
                </option>
                <option value="new" className="bg-slate-800">
                  New
                </option>
                <option value="acknowledged" className="bg-slate-800">
                  Acknowledged
                </option>
                <option value="in-progress" className="bg-slate-800">
                  In Progress
                </option>
                <option value="resolved" className="bg-slate-800">
                  Resolved
                </option>
                <option value="closed" className="bg-slate-800">
                  Closed
                </option>
              </select>
            </div>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all" className="bg-slate-800">
                All Priority
              </option>
              <option value="critical" className="bg-slate-800">
                Critical
              </option>
              <option value="high" className="bg-slate-800">
                High
              </option>
              <option value="medium" className="bg-slate-800">
                Medium
              </option>
              <option value="low" className="bg-slate-800">
                Low
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-400">
            Showing {filteredIncidents.length} of {state.incidents.length}{" "}
            incidents
          </span>
          {(searchTerm ||
            statusFilter !== "all" ||
            priorityFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setPriorityFilter("all");
              }}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="red" size="sm">
            {state.incidents.filter((i) => i.status === "new").length} New
          </Badge>
          <Badge variant="yellow" size="sm">
            {
              state.incidents.filter((i) =>
                ["acknowledged", "in-progress"].includes(i.status)
              ).length
            }{" "}
            Active
          </Badge>
          <Badge variant="red" size="sm">
            {
              state.incidents.filter(
                (i) =>
                  new Date() > i.slaDeadline &&
                  !["resolved", "closed"].includes(i.status)
              ).length
            }{" "}
            Overdue
          </Badge>
        </div>
      </div>

      {/* Incident Cards */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}

        {filteredIncidents.length === 0 && (
          <div className="text-center py-12 glass-card rounded-xl">
            <div className="text-slate-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No incidents found
            </h3>
            <p className="text-slate-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => setShowIncidentForm(true)} variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Report New Incident
            </Button>
          </div>
        )}
      </div>

      {/* Incident Form Modal */}
      <IncidentForm
        isOpen={showIncidentForm}
        onClose={() => setShowIncidentForm(false)}
      />
    </div>
  );
}
