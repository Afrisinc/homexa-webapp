"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        description="Manage customer conversations and inquiries"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Centralized messaging system will be available soon. View and
            respond to all customer inquiries from one place.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
