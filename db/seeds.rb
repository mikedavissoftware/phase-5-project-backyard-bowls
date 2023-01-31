## DESTROY
puts "💥 Destroying data..."
User.destroy_all
Item.destroy_all
Like.destroy_all
Comment.destroy_all

## FUNCTIONS
def dish_select(id)
  case id
  when 1
    "Rock"
  when 2
    "Hip Hop"
  when 3
    "Electronic"
  when 4
    "Metal"
  else
    "Invalid Selection"
  end
end