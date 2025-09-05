import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageCircle, History, Link2, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

/**
 * Панель комментариев и активности для задачи.
 * Содержит вкладки для комментариев, истории изменений и связанных элементов.
 */
export function TaskCommentsPanel() {
  return (
    <div className="flex-1 border-t lg:border-t-0 lg:border-l border-border overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
      <div className="p-4">
        <div className="sticky top-0 bg-background z-10 pb-4 pr-8 lg:pr-0">
        <Tabs defaultValue="comments" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comments" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Комментарии</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">История</span>
            </TabsTrigger>
            <TabsTrigger value="related" className="flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              <span className="hidden sm:inline">Связи</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comments" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Комментарии
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Здесь пока пусто</p>
                  <p className="text-xs mt-1">Комментарии будут добавлены позже</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="h-4 w-4" />
                  История изменений
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Placeholder history items */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Система</span> • Задача создана
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Только что</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-muted-foreground py-4">
                    <p className="text-xs">Детальная история будет добавлена позже</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  Связанные элементы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      Связанные задачи
                      <Badge variant="secondary" className="text-xs">0</Badge>
                    </h4>
                    <div className="text-center text-muted-foreground py-6">
                      <Link2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-xs">Нет связанных задач</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      Вложения
                      <Badge variant="secondary" className="text-xs">0</Badge>
                    </h4>
                    <div className="text-center text-muted-foreground py-6">
                      <p className="text-xs">Функционал будет добавлен позже</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  )
}
